module.exports = function() {
    return {
        "ureporters.reports.submit": {
            "request": {
                "method": "POST",
                "url": "http://example.com/ureporters/vumi_go_test/test_user/reports/",
                "body": {
                    "report": "report text"
                }
            },
            "response": {
                "code": 200,
                "body": {
                    "success": true,
                    "result": {
                        "accepted": true,
                        "response": "Thank you for your report."
                    }
                }
            }
        },
        "ureporters.get:test_user:not_found": {
            "request": {
                "method": "GET",
                "url": "http://example.com/ureporters/vumi_go_test/test_user"
            },
            "response": {
                "code": 404,
                "body": {
                    "success": false,
                    "reason": "Ureporter not found"
                }
            }
        },
        "ureporters.get:test_user:not_registered": {
            "request": {
                "method": "GET",
                "url": "http://example.com/ureporters/vumi_go_test/test_user"
            },
            "response": {
                "code": 200,
                "body": {
                    "success": true,
                    "user": {
                        "registered": false,
                        "language": "en"
                    }
                }
            }
        },
        "ureporters.get:test_user:registered": {
            "request": {
                "method": "GET",
                "url": "http://example.com/ureporters/vumi_go_test/test_user"
            },
            "response": {
                "code": 200,
                "body": {
                    "success": true,
                    "user": {
                        "registered": true,
                        "language": "en"
                    }
                }
            }
        },
        "ureporters.get:test_sw_user": {
            "request": {
                "method": "GET",
                "url": "http://example.com/ureporters/vumi_go_test/test_sw_user"
            },
            "response": {
                "code": 200,
                "body": {
                    "success": true,
                    "user": {
                        "registered": true,
                        "language": "sw"
                    }
                }
            }
        },
        "ureporters.polls.current:poll_1": {
            "request": {
                "method": "GET",
                "url": "http://example.com/ureporters/vumi_go_test/test_user/polls/current"
            },
            "response": {
                "code": 200,
                "body": {
                    "success": true,
                    "poll": {
                        "id": "poll_1",
                        "language": "en",
                        "name": "Poll 1",
                        "question": "What is your quest?",
                        "question_voice": "http://www.example.com/poll_1.ogg",
                        "start_date": "2012-04-23T18:25:43.511Z",
                        "end_date": null,
                        "is_registration": false,
                        "type": "text",
                        "default_response": null,
                        "default_response_voice": null,
                        "response_type": "allow_all"
                    }
                }
            }
        },
        "ureporters.polls.current:poll_2": {
            "request": {
                "method": "GET",
                "url": "http://example.com/ureporters/vumi_go_test/test_user/polls/current"
            },
            "response": {
                "code": 200,
                "body": {
                    "success": true,
                    "poll": {
                        "id": "poll_2",
                        "language": "en",
                        "name": "Poll 2",
                        "question": "What is box happening?",
                        "question_voice": "http://www.example.com/poll_2.ogg",
                        "start_date": "2012-04-23T18:25:43.511Z",
                        "end_date": null,
                        "is_registration": false,
                        "type": "text",
                        "default_response": null,
                        "default_response_voice": null,
                        "response_type": "allow_all"
                    }
                }
            }
        },
        "ureporters.polls.current:reg_poll_1": {
            "request": {
                "method": "GET",
                "url": "http://example.com/ureporters/vumi_go_test/test_user/polls/current"
            },
            "response": {
                "code": 200,
                "body": {
                    "success": true,
                    "poll": {
                        "id": "reg-poll_1",
                        "language": "en",
                        "name": "Registration Poll 1",
                        "question": "How old are you?",
                        "question_voice": "http://www.example.com/reg_poll_1.ogg",
                        "start_date": "2012-04-23T18:25:43.511Z",
                        "end_date": null,
                        "is_registration": false,
                        "type": "text",
                        "default_response": null,
                        "default_response_voice": null,
                        "response_type": "allow_all"
                    }
                }
            }
        },
        "ureporters.polls.current:reg_poll_2": {
            "request": {
                "method": "GET",
                "url": "http://example.com/ureporters/vumi_go_test/test_user/polls/current"
            },
            "response": {
                "code": 200,
                "body": {
                    "success": true,
                    "poll": {
                        "id": "reg-poll_2",
                        "language": "en",
                        "name": "Registration Poll 2",
                        "question": "What region do you live in?",
                        "question_voice": "http://www.example.com/reg_poll_2.ogg",
                        "start_date": "2012-04-23T18:25:43.511Z",
                        "end_date": null,
                        "is_registration": false,
                        "type": "text",
                        "default_response": null,
                        "default_response_voice": null,
                        "response_type": "allow_all"
                    }
                }
            }
        },
        "ureporters.polls.topics": {
            "request": {
                "method": "GET",
                "url": "http://example.com/ureporters/vumi_go_test/test_user/polls/topics"
            },
            "response": {
                "code": 200,
                "body": {
                    "success": true,
                    "poll_topics": [
                        {
                        "poll_id": "poll_1",
                        "label": "Poll 1"
                    },
                    {
                        "poll_id": "poll_2",
                        "label": "Poll 2"
                    }
                    ]
                }
            }
        },
        "ureporters.polls.summary:poll_1": {
            "request": {
                "method": "GET",
                "url": "http://example.com/ureporters/vumi_go_test/test_user/poll/poll_1/summary"
            },
            "response": {
                "code": 200,
                "body": {
                    "success": true,
                    "poll_result": {
                        "total_responses": 3756,
                        "responses": [
                            {
                            "label": "Choice 1",
                            "count": 1234
                        },
                        {
                            "label": "Choice 2",
                            "count": 2522
                        }
                        ]
                    }
                }
            }
        },
        "ureporters.poll.responses:poll_1": {
            "request": {
                "method": "POST",
                "url": "http://example.com/ureporters/vumi_go_test/test_user/poll/poll_1/responses",
                "body": {
                    "response": "response text"
                }
            },
            "response": {
                "code": 200,
                "body": {
                    "success": true,
                    "result": {
                        "accepted": true,
                        "response": "Thank you for answering the poll."
                    }
                }
            }
        },
        "ureporters.poll.responses:reg_poll_1": {
            "request": {
                "method": "POST",
                "url": "http://example.com/ureporters/vumi_go_test/test_user/poll/reg_poll_1/responses",
                "body": {
                    "response": "21"
                }
            },
            "response": {
                "code": 200,
                "body": {
                    "success": true,
                    "result": {
                        "accepted": true,
                        "response": "Thank you for answering the first registration question."
                    }
                }
            }
        }
    };
};
