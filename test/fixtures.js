module.exports = function() {
    return [
        {
        "request": {
            "url": "http://example.com/ureporters/vumi_go_test/user_default"
        },
        "response": {
            "data": {
                "success": true,
                "user": {
                    "registered": true,
                    "language": "en"
                }
            }
        }
    },
    {
        "request": {
            "method": "GET",
            "url": "http://example.com/ureporters/vumi_go_test/user_not_found"
        },
        "response": {
            "code": 404,
            "data": {
                "reason": "Ureporter not found",
                "success": false
            }
        }
    },
    {
        "request": {
            "url": "http://example.com/ureporters/vumi_go_test/user_not_registered"
        },
        "response": {
            "data": {
                "success": true,
                "user": {
                    "registered": false,
                    "language": "en"
                }
            }
        }
    },
    {
        "request": {
            "url": "http://example.com/ureporters/vumi_go_test/user_no_polls"
        },
        "response": {
            "data": {
                "success": true,
                "user": {
                    "registered": false,
                    "language": "en"
                }
            }
        }
    },
    {
        "request": {
            "url": "http://example.com/ureporters/vumi_go_test/user_on_reg_poll_1"
        },
        "response": {
            "data": {
                "success": true,
                "user": {
                    "registered": false,
                    "language": "en"
                }
            }
        }
    },
    {
        "request": {
            "url": "http://example.com/ureporters/vumi_go_test/user_on_reg_poll_2"
        },
        "response": {
            "data": {
                "success": true,
                "user": {
                    "registered": true,
                    "language": "en"
                }
            }
        }
    },
    {
        "request": {
            "url": "http://example.com/ureporters/vumi_go_test/user_sw"
        },
        "response": {
            "data": {
                "success": true,
                "user": {
                    "registered": true,
                    "language": "sw"
                }
            }
        }
    },
    {
        "request": {
            "method": "GET",
            "url": "http://example.com/ureporters/vumi_go_test/user_default/polls/current"
        },
        "response": {
            "data": {
                "poll": {
                    "question_voice": null,
                    "end_date": null,
                    "response_type": "allow_all",
                    "id": "poll_1",
                    "default_response": "",
                    "name": "quest",
                    "language": null,
                    "question": "What is your quest?",
                    "is_registration": true,
                    "default_response_voice": null,
                    "type": "t",
                    "start_date": null
                },
                "success": true
            },
        }
    },
    {
        "request": {
            "url": "http://example.com/ureporters/vumi_go_test/user_not_found/polls/current"
        },
        "responses": [
            {
            "code": 200,
            "data": {
                "poll": {
                    "type": "none",
                    "question": "Welcome to U-report!",
                    "id": null,
                    "name": "Message"
                },
                "success": true
            }
        },
        {
            "code": 200,
            "data": {
                "poll": {
                    "question_voice": null,
                    "end_date": null,
                    "response_type": "allow_all",
                    "id": "reg_poll_1",
                    "default_response": "",
                    "name": "age",
                    "language": null,
                    "question": "How old are you?",
                    "is_registration": true,
                    "default_response_voice": null,
                    "type": "t",
                    "start_date": null
                },
                "success": true
            }
        },
        {
            "data": {
                "poll": {
                    "question_voice": null,
                    "end_date": null,
                    "response_type": "allow_all",
                    "id": "reg_poll_2",
                    "default_response": "",
                    "name": "assyria",
                    "language": null,
                    "question": "What is the capital of Assyria?",
                    "is_registration": true,
                    "default_response_voice": null,
                    "type": "t",
                    "start_date": null
                },
                "success": true
            }
        }
        ]
    },
    {
        "request": {
            "url": "http://example.com/ureporters/vumi_go_test/user_not_registered/polls/current"
        },
        "responses": [
            {
            "code": 200,
            "data": {
                "poll": {
                    "type": "none",
                    "question": "Welcome to U-report!",
                    "id": null,
                    "name": "Message"
                },
                "success": true
            }
        },
        {
            "code": 200,
            "data": {
                "poll": {
                    "question_voice": null,
                    "end_date": null,
                    "response_type": "allow_all",
                    "id": "reg_poll_1",
                    "default_response": "",
                    "name": "age",
                    "language": null,
                    "question": "How old are you?",
                    "is_registration": true,
                    "default_response_voice": null,
                    "type": "t",
                    "start_date": null
                },
                "success": true
            }
        },
        {
            "data": {
                "poll": {
                    "question_voice": null,
                    "end_date": null,
                    "response_type": "allow_all",
                    "id": "reg_poll_2",
                    "default_response": "",
                    "name": "assyria",
                    "language": null,
                    "question": "What is the capital of Assyria?",
                    "is_registration": true,
                    "default_response_voice": null,
                    "type": "t",
                    "start_date": null
                },
                "success": true
            }
        }
        ]
    },
    {
        "request": {
            "method": "GET",
            "url": "http://example.com/ureporters/vumi_go_test/user_on_reg_poll_1/polls/current"
        },
        "responses": [
            {
            "code": 200,
            "data": {
                "poll": {
                    "type": "none",
                    "question": "Welcome to U-report!",
                    "id": null,
                    "name": "Message"
                },
                "success": true
            }
        },
        {
            "code": 200,
            "data": {
                "poll": {
                    "question_voice": null,
                    "end_date": null,
                    "response_type": "allow_all",
                    "id": "reg_poll_1",
                    "default_response": "",
                    "name": "age",
                    "language": null,
                    "question": "How old are you?",
                    "is_registration": true,
                    "default_response_voice": null,
                    "type": "t",
                    "start_date": null
                },
                "success": true
            }
        },
        {
            "data": {
                "poll": {
                    "question_voice": null,
                    "end_date": null,
                    "response_type": "allow_all",
                    "id": "reg_poll_2",
                    "default_response": "",
                    "name": "assyria",
                    "language": null,
                    "question": "What is the capital of Assyria?",
                    "is_registration": true,
                    "default_response_voice": null,
                    "type": "t",
                    "start_date": null
                },
                "success": true
            }
        }
        ]
    },
    {
        "request": {
            "method": "GET",
            "url": "http://example.com/ureporters/vumi_go_test/user_bad_input_on_reg_poll_1/polls/current"
        },
        "responses": [
            {
            "code": 200,
            "data": {
                "poll": {
                    "type": "none",
                    "question": "Welcome to U-report!",
                    "id": null,
                    "name": "Message"
                },
                "success": true
            }
        },
        {
            "code": 200,
            "data": {
                "poll": {
                    "question_voice": null,
                    "end_date": null,
                    "response_type": "allow_all",
                    "id": "reg_poll_1",
                    "default_response": "",
                    "name": "age",
                    "language": null,
                    "question": "How old are you?",
                    "is_registration": true,
                    "default_response_voice": null,
                    "type": "t",
                    "start_date": null
                },
                "success": true
            }
        },
        {
            "data": {
                "poll": {
                    "question_voice": null,
                    "end_date": null,
                    "response_type": "allow_all",
                    "id": "reg_poll_2",
                    "default_response": "",
                    "name": "assyria",
                    "language": null,
                    "question": "What is the capital of Assyria?",
                    "is_registration": true,
                    "default_response_voice": null,
                    "type": "t",
                    "start_date": null
                },
                "success": true
            }
        }
        ]
    },
    {
        "request": {
            "method": "GET",
            "url": "http://example.com/ureporters/vumi_go_test/user_on_reg_poll_2/polls/current"
        },
        "response": {
            "data": {
                "poll": {
                    "question_voice": null,
                    "end_date": null,
                    "response_type": "allow_all",
                    "id": "reg_poll_2",
                    "default_response": "",
                    "name": "assyria",
                    "language": null,
                    "question": "What is the capital of Assyria?",
                    "is_registration": true,
                    "default_response_voice": null,
                    "type": "t",
                    "start_date": null
                },
                "success": true
            },
        }
    },
    {
        "request": {
            "method": "GET",
            "url": "http://example.com/ureporters/vumi_go_test/user_bad_input_on_reg_poll_2/polls/current"
        },
        "response": {
            "data": {
                "poll": {
                    "question_voice": null,
                    "end_date": null,
                    "response_type": "allow_all",
                    "id": "reg_poll_2",
                    "default_response": "",
                    "name": "assyria",
                    "language": null,
                    "question": "What is the capital of Assyria?",
                    "is_registration": true,
                    "default_response_voice": null,
                    "type": "t",
                    "start_date": null
                },
                "success": true
            },
        }
    },
    {
        "request": {
            "method": "GET",
            "url": "http://example.com/ureporters/vumi_go_test/user_on_poll_1/polls/current"
        },
        "response": {
            "data": {
                "poll": {
                    "question_voice": null,
                    "end_date": null,
                    "response_type": "allow_all",
                    "id": "poll_1",
                    "default_response": "",
                    "name": "quest",
                    "language": null,
                    "question": "What is your quest?",
                    "is_registration": true,
                    "default_response_voice": null,
                    "type": "t",
                    "start_date": null
                },
                "success": true
            },
        }
    },
    {
        "request": {
            "method": "GET",
            "url": "http://example.com/ureporters/vumi_go_test/user_bad_input_on_poll_1/polls/current"
        },
        "response": {
            "data": {
                "poll": {
                    "question_voice": null,
                    "end_date": null,
                    "response_type": "allow_all",
                    "id": "poll_1",
                    "default_response": "",
                    "name": "quest",
                    "language": null,
                    "question": "What is your quest?",
                    "is_registration": true,
                    "default_response_voice": null,
                    "type": "t",
                    "start_date": null
                },
                "success": true
            },
        }
    },
    {
        "request": {
            "method": "GET",
            "url": "http://example.com/ureporters/vumi_go_test/user_on_poll_2/polls/current"
        },
        "response": {
            "data": {
                "poll": {
                    "question_voice": null,
                    "end_date": null,
                    "response_type": "allow_all",
                    "id": "poll_2",
                    "default_response": "",
                    "name": "colour",
                    "language": null,
                    "question": "What is your favourite colour?",
                    "is_registration": true,
                    "default_response_voice": null,
                    "type": "t",
                    "start_date": null
                },
                "success": true
            },
        }
    },
    {
        "request": {
            "method": "GET",
            "url": "http://example.com/ureporters/vumi_go_test/user_bad_input_on_poll_2/polls/current"
        },
        "response": {
            "data": {
                "poll": {
                    "question_voice": null,
                    "end_date": null,
                    "response_type": "allow_all",
                    "id": "poll_2",
                    "default_response": "",
                    "name": "colour",
                    "language": null,
                    "question": "What is your favourite colour?",
                    "is_registration": true,
                    "default_response_voice": null,
                    "type": "t",
                    "start_date": null
                },
                "success": true
            },
        }
    },
    {
        "request": {
            "method": "GET",
            "url": "http://example.com/ureporters/vumi_go_test/user_no_polls/polls/current"
        },
        "response": {
            "data": {
                "poll": null,
                "success": true
            },
        }
    },
    {
        "request": {
            "method": "POST",
            "url": "http://example.com/ureporters/vumi_go_test/user_on_reg_poll_1/poll/reg_poll_1/responses/",
            "data": {
                "response": "21"
            }
        },
        "response": {
            "code": 200,
            "data": {
                "result": {
                    "accepted": true,
                    "response": null
                },
                "success": true
            }
        }
    },
    {
        "request": {
            "method": "POST",
            "url": "http://example.com/ureporters/vumi_go_test/user_on_reg_poll_2/poll/reg_poll_2/responses/",
            "data": {
                "response": "I don't know that"
            }
        },
        "response": {
            "code": 200,
            "data": {
                "result": {
                    "accepted": true,
                    "response": null
                },
                "success": true
            }
        }
    },
    {
        "request": {
            "method": "POST",
            "url": "http://example.com/ureporters/vumi_go_test/user_on_poll_1/poll/poll_1/responses/",
            "data": {
                "response": "To seek the Holy Grail"
            }
        },
        "response": {
            "code": 200,
            "data": {
                "result": {
                    "accepted": true,
                    "response": "Thank you for answering poll 1. View the results so far?"
                },
                "success": true
            }
        }
    },
    {
        "request": {
            "method": "POST",
            "url": "http://example.com/ureporters/vumi_go_test/user_on_poll_2/poll/poll_2/responses/",
            "data": {
                "response": "Blue"
            }
        },
        "response": {
            "code": 200,
            "data": {
                "result": {
                    "accepted": true,
                    "response": null
                },
                "success": true
            }
        }
    },
    {
        "request": {
            "method": "POST",
            "url": "http://example.com/ureporters/vumi_go_test/user_bad_input_on_reg_poll_1/poll/reg_poll_1/responses/",
            "data": {
                "response": "bad input"
            }
        },
        "response": {
            "code": 200,
            "data": {
                "success": true,
                "result": {
                    "accepted": false,
                    "response": "We did not understand your response to registration poll 1, please try again."
                }
            }
        }
    },
    {
        "request": {
            "method": "POST",
            "url": "http://example.com/ureporters/vumi_go_test/user_bad_input_on_reg_poll_2/poll/reg_poll_2/responses/",
            "data": {
                "response": "bad input"
            }
        },
        "response": {
            "code": 200,
            "data": {
                "success": true,
                "result": {
                    "accepted": false,
                    "response": null
                }
            }
        }
    },
    {
        "request": {
            "method": "POST",
            "url": "http://example.com/ureporters/vumi_go_test/user_bad_input_on_poll_1/poll/poll_1/responses/",
            "data": {
                "response": "bad input"
            }
        },
        "response": {
            "code": 200,
            "data": {
                "success": true,
                "result": {
                    "accepted": false,
                    "response": "We did not understand your response to poll 1, please try again."
                }
            }
        }
    },
    {
        "request": {
            "method": "POST",
            "url": "http://example.com/ureporters/vumi_go_test/user_bad_input_on_poll_2/poll/poll_2/responses/",
            "data": {
                "response": "bad input"
            }
        },
        "response": {
            "code": 200,
            "data": {
                "success": true,
                "result": {
                    "accepted": false,
                    "response": null
                }
            }
        }
    },
    {
        "request": {
            "method": "GET",
            "url": "http://example.com/ureporters/vumi_go_test/user_default/poll/poll_1/summary"
        },
        "response": {
            "code": 200,
            "data": {
                "poll_result": {
                    "total_responses": 3756,
                    "total_categorized_responses": 3333,
                    "responses": [
                        {
                        "count": 423,
                        "name": "Uncategorized"
                    },
                    {
                        "count": 2500,
                        "name": "22 - 31"
                    },
                    {
                        "count": 833,
                        "name": "32 - 41"
                    }
                    ]
                },
                "success": true
            }
        }
    },
    {
        "request": {
            "method": "GET",
            "url": "http://example.com/ureporters/vumi_go_test/user_default/polls/topics"
        },
        "response": {
            "code": 200,
            "data": {
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
    {
        "request": {
            "method": "GET",
            "url": "http://example.com/ureporters/vumi_go_test/user_on_empty_topics/polls/topics"
        },
        "response": {
            "code": 200,
            "data": {
                "success": true,
                "poll_topics": []
            }
        }
    },
    {
        "request": {
            "method": "POST",
            "url": "http://example.com/ureporters/vumi_go_test/user_default/reports/",
            "data": {
                "report": "report text"
            }
        },
        "response": {
            "code": 200,
            "data": {
                "result": {
                    "accepted": true,
                    "response": "Thank you for your report."
                },
                "success": true
            }
        }
    },
    {
        "request": {
            "method": "POST",
            "url": "http://example.com/ureporters/vumi_go_test/user_bad_input/reports/",
            "data": {
                "report": "bad input"
            }
        },
        "response": {
            "code": 200,
            "data": {
                "success": true,
                "result": {
                    "accepted": false,
                    "response": "We did not understand your report, please try again"
                }
            }
        }
    },
    {
        "request": {
            "method": "POST",
            "url": "http://example.com/ureporters/vumi_go_test/user_got_no_report_response/reports/",
            "data": {
                "report": "report text"
            }
        },
        "response": {
            "code": 200,
            "data": {
                "success": true,
                "result": {
                    "accepted": true,
                    "response": null
                }
            }
        }
    },
    {
        "request": {
            "method": "POST",
            "url": "http://example.com/ureporters/vumi_go_test/user_bad_input_got_no_report_response/reports/",
            "data": {
                "report": "bad input"
            }
        },
        "response": {
            "code": 200,
            "data": {
                "success": true,
                "result": {
                    "accepted": false,
                    "response": null
                }
            }
        }
    }
    ];
};
