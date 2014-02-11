module.exports = function() {
return {
  "ureporters.reports.submit": {
    "request": {
      "method": "POST",
      "url": "http://example.com/ureporters/vumi_go_test/user_default/reports/",
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
  "ureporters.get:users:not_found": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/users:not_found"
    },
    "response": {
      "code": 404,
      "body": {
        "success": false,
        "reason": "Ureporter not found"
      }
    }
  },
  "ureporters.get:users:not_registered": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/users:not_registered"
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
  "ureporters.get:users:default": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/users:default"
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
  "ureporters.get:users:sw": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/users:sw"
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
  "ureporters.polls.current:users:on_poll_1": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/users:on_poll_1/polls/current"
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
  "ureporters.polls.current:users:on_poll_2": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/users:on_poll_2/polls/current"
    },
    "response": {
      "code": 200,
      "body": {
        "success": true,
        "poll": {
          "id": "poll_2",
          "language": "en",
          "name": "Poll 2",
          "question": "What is your favourite colour?",
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
  "ureporters.polls.current:users:on_reg_poll_1": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/users:on_reg_poll_1/polls/current"
    },
    "response": {
      "code": 200,
      "body": {
        "success": true,
        "poll": {
          "id": "reg_poll_1",
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
  "ureporters.polls.current:users:on_reg_poll_2": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/users:on_reg_poll_2/polls/current"
    },
    "response": {
      "code": 200,
      "body": {
        "success": true,
        "poll": {
          "id": "reg_poll_2",
          "language": "en",
          "name": "Registration Poll 2",
          "question": "What is the capital of Assyria?",
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
      "url": "http://example.com/ureporters/vumi_go_test/user_default/polls/topics"
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
      "url": "http://example.com/ureporters/vumi_go_test/user_default/poll/poll_1/summary"
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
      "url": "http://example.com/ureporters/vumi_go_test/user_on_poll_1/poll/poll_1/responses/",
      "body": {
        "response": "To seek the Holy Grail"
      }
    },
    "response": {
      "code": 200,
      "body": {
        "success": true,
        "result": {
          "accepted": true,
          "response": "Thank you for answering poll 1. View the results so far?"
        }
      }
    }
  },
  "ureporters.poll.responses:poll_2": {
    "request": {
      "method": "POST",
      "url": "http://example.com/ureporters/vumi_go_test/user_on_poll_2/poll/poll_2/responses/",
      "body": {
        "response": "Blue"
      }
    },
    "response": {
      "code": 200,
      "body": {
        "success": true,
        "result": {
          "accepted": true,
          "response": null
        }
      }
    }
  },
  "ureporters.poll.responses:reg_poll_1": {
    "request": {
      "method": "POST",
      "url": "http://example.com/ureporters/vumi_go_test/user_on_reg_poll_1/poll/reg_poll_1/responses/",
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
  },
  "ureporters.poll.responses:reg_poll_2": {
    "request": {
      "method": "POST",
      "url": "http://example.com/ureporters/vumi_go_test/user_on_reg_poll_2/poll/reg_poll_2/responses/",
      "body": {
        "response": "I don't know that"
      }
    },
    "response": {
      "code": 200,
      "body": {
        "success": true,
        "result": {
          "accepted": true,
          "response": "You are now registered."
        }
      }
    }
  },
  "ureporters.polls.current:users:not_found": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/users:not_found/polls/current"
    },
    "response": {
      "code": 200,
      "body": {
        "success": true,
        "poll": {
          "id": "reg_poll_1",
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
  "ureporters.polls.current:users:not_registered": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/users:not_registered/polls/current"
    },
    "response": {
      "code": 200,
      "body": {
        "success": true,
        "poll": {
          "id": "reg_poll_1",
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
  "ureporters.get:users:on_reg_poll_1": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/users:on_reg_poll_1"
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
  "ureporters.get:users:on_reg_poll_2": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/users:on_reg_poll_2"
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
  "ureporters.polls.current:users:default": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/users:default/polls/current"
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
  "ureporters.get:user_not_found": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/user_not_found"
    },
    "response": {
      "code": 404,
      "body": {
        "success": false,
        "reason": "Ureporter not found"
      }
    }
  },
  "ureporters.get:user_not_registered": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/user_not_registered"
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
  "ureporters.get:user_default": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/user_default"
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
  "ureporters.get:user_on_reg_poll_1": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/user_on_reg_poll_1"
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
  "ureporters.get:user_on_reg_poll_2": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/user_on_reg_poll_2"
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
  "ureporters.get:user_sw": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/user_sw"
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
  "ureporters.polls.current:user_not_found": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/user_not_found/polls/current"
    },
    "response": {
      "code": 200,
      "body": {
        "success": true,
        "poll": {
          "id": "reg_poll_1",
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
  "ureporters.polls.current:user_not_registered": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/user_not_registered/polls/current"
    },
    "response": {
      "code": 200,
      "body": {
        "success": true,
        "poll": {
          "id": "reg_poll_1",
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
  "ureporters.polls.current:user_default": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/user_default/polls/current"
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
  "ureporters.polls.current:user_on_poll_1": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/user_on_poll_1/polls/current"
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
  "ureporters.polls.current:user_on_poll_2": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/user_on_poll_2/polls/current"
    },
    "response": {
      "code": 200,
      "body": {
        "success": true,
        "poll": {
          "id": "poll_2",
          "language": "en",
          "name": "Poll 2",
          "question": "What is your favourite colour?",
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
  "ureporters.polls.current:user_on_reg_poll_1": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/user_on_reg_poll_1/polls/current"
    },
    "response": {
      "code": 200,
      "body": {
        "success": true,
        "poll": {
          "id": "reg_poll_1",
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
  "ureporters.polls.current:user_on_reg_poll_2": {
    "request": {
      "method": "GET",
      "url": "http://example.com/ureporters/vumi_go_test/user_on_reg_poll_2/polls/current"
    },
    "response": {
      "code": 200,
      "body": {
        "success": true,
        "poll": {
          "id": "reg_poll_2",
          "language": "en",
          "name": "Registration Poll 2",
          "question": "What is the capital of Assyria?",
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
  "ureporters.reports.submit:user_got_no_report_response": {
    "request": {
      "method": "POST",
      "url": "http://example.com/ureporters/vumi_go_test/user_got_no_report_response/reports/",
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
          "response": null
        }
      }
    }
  }
};
};
