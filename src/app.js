vumi_ureport.app = function() {
    var Q = require('q');
    var _ = require('underscore');

    var vumigo = require('vumigo_v02');
    var App = vumigo.App;
    var Choice = vumigo.states.Choice;
    var MenuState = vumigo.states.MenuState;
    var ChoiceState = vumigo.states.ChoiceState;
    var FreeText = vumigo.states.FreeText;
    var EndState = vumigo.states.EndState;
    var UReportApi = vumi_ureport.api.UReportApi;

    var VumiUReportApp = App.extend(function(self, opts) {
        App.call(self, 'states:start');

        opts = _(opts || {}).defaults({ureport: null});
        self.ureport = opts.ureport;

        self.init = function() {
            self.user = self.im.user;
            self.config = self.im.config;

            var api_config = self.im.config.get('ureport_api');
            self.ureport = self.ureport || new UReportApi(
                self.im,
                api_config.url,
                api_config.backend,
                {auth: api_config.auth});
            self.ureporter = self.ureport.ureporters(self.user.addr);
        };

        self.format_summary = function(data) {
            var parts = [];
            parts.push(['Total responses', data.total_responses].join(': '));
            data.responses.forEach(function(response) {
                parts.push([response.name, response.count].join(': '));
            });
            return parts.join('\n');
        };

        self.states.add('states:start', function() {
            return self.ureporter.get().then(function(user) {
                var p = Q();
                if (user) {
                    p = self.user.set_lang(user.language);
                }

                return p.then(function() {
                    return user && user.registered
                        ? self.states.create('states:main_menu')
                        : self.states.create('states:register');
                });
            });
        });

        // TODO what to do with submission response?
        self.states.add('states:register', function(name, opts) {
            var error = "Response rejected, please try again.";

            return self.ureporter.polls.current().then(function(poll) {
                if (poll === null) {
                    return self.states.create('states:register:none');
                }

                return new FreeText(name, {
                    question: poll.question,

                    check: function(content) {
                        return self
                            .ureporter.poll(poll.id)
                            .responses.submit(content)
                            .then(function(result) {
                                if (!result.accepted) {
                                    return result.response || error;
                                }
                            });
                    },

                    next: 'states:start'
                });
            });
        });

        // TODO what to put as question?
        self.states.add('states:main_menu', function(name) {
            return new MenuState(name, {
                question: "Ureport (Speak out for your community)",

                choices: [
                    new Choice('states:poll:question', "This week's question"),
                    new Choice('states:results:choose', 'Poll results'),
                    new Choice('states:reports:submit', 'Send report')
                ]
            });
        });

        self.states.add('states:poll:question', function(name) {
            var error =  "Response rejected, please try again.";
            var response;

            return self.ureporter.polls.current().then(function(poll) {
                if (poll === null) {
                    return self.states.create('states:poll:none');
                }

                return new FreeText(name, {
                    question: poll.question,

                    check: function(content) {
                        return self
                            .ureporter.poll(poll.id)
                            .responses.submit(content)
                            .then(function(result) {
                                response = result.response;

                                if (!result.accepted) {
                                    return response || error;
                                }
                            });
                    },

                    next: function() {
                        return {
                            name: 'states:poll:question:accepted',
                            creator_opts: {
                                poll_id: poll.id,
                                response: response
                            }
                        };
                    }
                });
            });
        });

        self.states.add('states:poll:none', function(name) {
            return new EndState(name, {
                text: [
                    "There is currently no poll available,",
                    "please try again later"].join(' '),
                next: 'states:start'
            });
        });

        // TODO what to put as default question?
        self.states.add('states:poll:question:accepted', function(name, opts) {
            opts.response = opts.response || [
                "Thank you for your response.",
                "View the results so far?"
            ].join(' ');

            return new ChoiceState(name, {
                question: opts.response,

                choices: [
                    new Choice('yes', 'Yes'),
                    new Choice('no', 'No')],

                next: function(choice) {
                    if (choice.value == 'no') {
                        return 'states:end';
                    }
                    else if (choice.value == 'yes') {
                        return {
                            name: 'states:results:view',
                            creator_opts: {poll_id: opts.poll_id}
                        };
                    }
                }
            });
        });

        // TODO what to put as default question?
        self.states.add('states:results:choose', function(name) {
            return self.ureporter.polls.topics().then(function(topics) {
                if (!topics.length) {
                    return self.states.create('states:results:empty');
                }

                return new ChoiceState(name, {
                    question: "Choose poll:",
                    
                    choices: topics.map(function(topic) {
                        return new Choice(topic.poll_id, topic.label);
                    }),

                    next: function(choice) {
                        return {
                            name: 'states:results:view',
                            creator_opts: {poll_id: choice.value}
                        };
                    }
                });
            });
        });

        // TODO what to put as text
        self.states.add('states:results:empty', function(name) {
            return new EndState(name, {
                text: [
                    "There are no polls to see results for at the moment,",
                    "please try again later."].join(' '),
                next: 'states:start'
            });
        });

        self.states.add('states:results:view', function(name, opts) {
            return self
            .ureporter.poll(opts.poll_id)
            .summary()
            .then(function(summary) {
                return new EndState(name, {
                    text: self.format_summary(summary),
                    next: 'states:start'
                });
            });
        });

        self.states.add('states:reports:submit', function(name) {
            var error = "Response rejected, please try again.";
            var response;

            return new FreeText(name, {
                question: "Enter message:",

                check: function(content) {
                    return self
                        .ureporter.reports.submit(content)
                        .then(function(result) {
                            response = result.response;

                            if (!result.accepted) {
                                return response || error;
                            }
                        });
                },

                next: function() {
                    return {
                        name: 'states:reports:submit:accepted',
                        creator_opts: {response: response}
                    };
                }
            });
        });

        // TODO what to put as default response
        self.states.add('states:reports:submit:accepted', function(name, opts) {
            opts.response = opts.response || "Thank you for your msg.";

            return new EndState(name, {
                text: opts.response,
                next: 'states:start'
            });
        });

        // TODO what to put as default end response
        self.states.add('states:end', function(name) {
            return new EndState(name, {
                text: "Thank you for using Ureport.",
                next: 'states:start'
            });
        });
    });

    return {
        VumiUReportApp: VumiUReportApp
    };
}();
