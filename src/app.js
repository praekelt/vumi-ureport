vumi_ureport.app = function() {
    var vumigo = require('vumigo_v02');
    var App = vumigo.App;
    var Choice = states.Choice;
    var ChoiceState = states.ChoiceState;
    var FreeText = vumigo.states.FreeText;
    var EndState = vumigo.states.EndState;
    var UReportApi = vumi_ureport.api.UReportApi;

    var VumiUReportApp = App.extend(function(self, opts) {
        App.call(self, 'states:initial');

        utils.set_defaults(opts || {}, {UReportApi: UReportApi});
        self.UReportApi = UReportApi;

        self.init = function() {
            var url = self.im.config.get('ureport_api_url');
            var backend = self.im.config.get('ureport_backend');

            self.user = self.im.user;
            self.config = self.im.config;
            self.ureport = new self.UReportApi(self.im, url, backend);
            self.ureporter = self.ureport.ureporters(self.user.addr);

            self.im.on('session:new', function() {
                return self.refresh_user();
            });
        };

        self.refresh_user = function() {
            return self.ureporter.get().then(function(user) {
                if (!user) {
                    self.user.update_metadata({registered: false});
                    return;
                } else {
                    self.user.update_metadata({registered: user.registered});
                    return self.user.set_lang(user.language);
                }
            });
        };

        self.set_poll_id = function(poll_id) {
            self.user.metadata.poll_id = poll_id;
        };

        self.set_response = function(response) {
            self.user.metadata.response = response;
        };

        self.show_poll = function(state_name, opts) {
            return self.ureporter.polls.current().then(function(poll) {
                opts = utils.set_defaults(opts || {}, {
                    question: poll.question,
                    next: utils.noop
                });

                var next = opts.next;
                opts.next = function(content) {
                    return self
                        .ureporter.poll(poll.id)
                        .responses.submit(content)
                        .then(function(result) {
                            if (result.accepted) {
                                self.set_response(result.response);
                                return next(content);
                            }
                            else {
                                // TODO what do do here?
                                return;
                            }
                        });
                };

                self.set_poll_id(poll.id);
                return new FreeText(state_name, opts);
            });
        };

        self.format_summary = function(data) {
            var parts = [];
            parts.push(['Total responses', data.total_responses].join(': '));
            data.responses.each(function(response) {
                parts.push([response.label, response.count].join(': '));
            });
            return parts.join('\n');
        };

        self.states.add('states:initial', function() {
            return self.user.metadata.registered
                ? self.states.create('states:main_menu')
                : self.states.create('states:register');
        });

        self.states.add('states:register', function(state_name) {
            function next(content) {
                return self
                    .refresh_user()
                    .then(function() {
                        return self.user.metadata.registered
                            ? 'states:main_menu'
                            : 'states:register';
                    });
            }

            return self.show_poll(state_name, {next: next});
        });

        // TODO what to put as question?
        self.states.add('states:main_menu', function(state_name) {
            return new ChoiceState(state_name, {
                question: "Welcome!",
                choices: [
                    new Choice('poll', 'Take the Poll'),
                    new Choice('results', 'See Results'),
                    new Choice('reports', 'Submit Report')
                ],
                next: function(choice) {
                    return {
                        poll: 'states:poll:question',
                        results: 'states:results:view',
                        reports: 'states:reports:submit'
                    }[choice.value];
                }
            });
        });

        self.states.add('states:poll:question', function(state_name) {
            return self.show_poll(state_name, {next: 'after_question'});
        });

        // TODO what to put as default question?
        self.states.add('states:poll:after_question', function(state_name) {
            var response = self.user.metatadata.response;

            return new ChoiceState(state_name, {
                question: response || [
                    "Thank you for submitting.",
                    "Would you like to view poll results?"].join(' '),
                choices: [
                    new Choice('yes', 'Yes'),
                    new Choice('no', 'No')],
                next: function(choice) {
                    return {
                        yes: 'states:results:view',
                        no: 'states:end',
                    }[choice.value];
                }
            });
        });

        self.states.add('states:results:choose', function(state_name) {
            return self.ureporter.polls.topics().then(function(topics) {
                return new ChoiceState(state_name, {
                    question: [
                        "Thank you for submitting.",
                        "Would you like to view poll results?"].join(' '),
                    choices: topics.map(function(topic) {
                        return new Choice(topic.poll_id, topic.label);
                    }),
                    next: function(choice) {
                        self.set_poll_id(choice.value);
                        return 'states:results:view';
                    }
                });
            });
        });

        self.states.add('states:results:view', function(state_name) {
            var id = self.user.metadata.poll_id;
            return self.ureporter.poll(id).summary().then(function(summary) {
                return new EndState(state_name, {
                    text: self.format_summary(summary),
                    next: 'states:start'
                });
            });
        });

        self.states.add('states:reports:submit', function(state_name) {
            return new FreeText(state_name, {
                question: "Please enter your report",
                next: function(content) {
                    return self
                        .ureporter.reports.submit(content)
                        .then(function(result) {
                            if (!result.accepted) {
                                // TODO what to do here
                            }
                            else {
                                self.set_response(results.response);
                                return 'states:reports:after_submit';
                            }
                        });
                }
            });
        });

        // TODO what to put as default response
        self.states.add('states:reports:after_submit', function(state_name) {
            var response = self.user.metadata.response;

            return new EndState(state_name, {
                text: response || "Thank you, we've received your report.",
                next: 'states:start'
            });
        });

        // TODO what to put as default end response
        self.states.add('states:end', function(state_name) {
            return new EndState(state_name, {
                text: "Thank you for using U-Report, goodbye.",
                next: 'states:start'
            });
        });
    });


    return {
        VumiUReportApp: VumiUReportApp
    };
}();
