vumi_ureport.app = function() {
    var vumigo = require('vumigo_v02');
    var App = vumigo.App;
    var Choice = states.Choice;
    var ChoiceState = states.ChoiceState;
    var FreeText = vumigo.states.FreeText;
    var EndState = vumigo.states.EndState;
    var UReportApi = vumi_ureport.api.UReportApi;

    var VumiUReportApp = App.extend(function(self, opts) {
        App.call(self, 'states:start');

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

        self.show_poll = function(name, opts) {
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
                                return next(content, poll, result);
                            }
                            else {
                                // TODO what do do here?
                                return;
                            }
                        });
                };

                return new FreeText(name, opts);
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

        self.states.add('states:start', function() {
            return self.user.metadata.registered
                ? self.states.create('states:main_menu')
                : self.states.create('states:register');
        });

        self.states.add('states:register', function(name) {
            function next(content) {
                return self
                    .refresh_user()
                    .then(function() {
                        return self.user.metadata.registered
                            ? 'states:main_menu'
                            : 'states:register';
                    });
            }

            return self.show_poll(name, {next: next});
        });

        // TODO what to put as question?
        self.states.add('states:main_menu', function(name) {
            return new ChoiceState(name, {
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

        self.states.add('states:poll:question', function(name) {
            return self.show_poll(name, {
                next: function(next, poll, result) {
                    return {
                        name: 'states:after_question',
                        metadata: {response: result.response}
                    };
                }
            });
        });

        // TODO what to put as default question?
        self.states.add('states:poll:after_question', function(name) {
            var response = self.user.state.metadata.response;

            return new ChoiceState(name, {
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

        self.states.add('states:results:choose', function(name) {
            return self.ureporter.polls.topics().then(function(topics) {
                return new ChoiceState(name, {
                    question: [
                        "Thank you for submitting.",
                        "Would you like to view poll results?"].join(' '),
                    choices: topics.map(function(topic) {
                        return new Choice(topic.poll_id, topic.label);
                    }),
                    next: function(choice) {
                        return {
                            name: 'states:results:view',
                            opts: {poll_id: choice.value}
                        };
                    }
                });
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
            return new FreeText(name, {
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
        self.states.add('states:reports:after_submit', function(name, opts) {
            utils.set_defaults(opts, {
                response: "Thank you, we've received your report."
            });

            return new EndState(name, {
                text: opts.response,
                next: 'states:start'
            });
        });

        // TODO what to put as default end response
        self.states.add('states:end', function(name) {
            return new EndState(name, {
                text: "Thank you for using U-Report, goodbye.",
                next: 'states:start'
            });
        });
    });

    return {
        VumiUReportApp: VumiUReportApp
    };
}();
