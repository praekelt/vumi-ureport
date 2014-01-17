.. UReport API for Vumi USSD sandbox application

UReport JSON HTTP API
=====================

This API is designed for the Vumi USSD sandbox application but the
intention is that the API should be fairly generic in the hope that it
will be usuable by other applications in future.

The API is intended to cover the following parts of U-Report
functionality:

* Registering a UReporter
* Completing a poll
* Submitting poll results
* Viewing poll results
* Submitting a report

Request responses and bodies are all JSON encoded.

One of the initial backends will be voice with IVR.


Contents
--------

* :ref:`response-format-overview`
* :ref:`api-methods`

  * :http:get:`/ureporters/(str:backend)/(str:user_address)`
  * :http:get:`/ureporters/(str:backend)/(str:user_address)/polls/current`
  * :http:get:`/ureporters/(str:backend)/(str:user_address)/polls/topics`
  * :http:post:`/ureporters/(str:backend)/(str:user_address)/poll/(str:poll_id)/responses/`
  * :http:get:`/ureporters/(str:backend)/(str:user_address)/poll/(str:poll_id)/summary`
  * :http:post:`/ureporters/(str:backend)/(str:user_address)/reports/`


.. _response-format-overview:

Response format overview
------------------------

All response bodies will be JSON formatted and contain objects with at
least a key named ``success``. If the HTTP response code was in the
``200`` range, the value of ``success`` will be ``true``. Otherwise,
the value will be ``false``.

**Example response (success)**:

.. sourcecode:: http

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
     "success": true,
     ...
   }

**Example response (error)**:

.. sourcecode:: http

   HTTP/1.1 404 NOT FOUND
   Content-Type: application/json

   {
     "success": false,
     "reason": "Ureporter not found"
   }


.. _api-methods:

API methods
-----------

.. http:get:: /ureporters/(str:backend)/(str:user_address)

   Information on the given Ureporter.

   :reqheader Accept: Should be ``application/json``.
   :reqheader Authorization: Optional HTTP Basic authentication.

   :param str backend:
       The RapidSMS / U-Report backend the user is utilizing (e.g.
       ``vumi_go_ussd`` or ``vumi_go_voice``).
   :param str address:
       The address of the user (e.g. ``+256775551122``).

   :resheader Content-Type: ``application/json``.

   :statuscode 200: no error
   :statuscode 404: no user found

   **Description of the JSON response attributes**:

   The ``registered`` parameter is ``true`` if the Ureporter has
   completed registration and ``false`` otherwise.

   The ``language`` parameter should be a two-letter language code
   as defined in ISO 639-1 or ``null`` if the Ureporter's preferred
   language is not yet known.

   .. warning::

      If anyone would like to suggest extra fields to return for the user,
      that would be useful.

   **Example request**:

   .. sourcecode:: http

      GET /ureporters/vumi_go_sms/+256775551122
      Host: example.com
      Accept: application/json

   **Example response (success)**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
        "success": true,
        "user": {
            "id": "1234",
            "registered": false,
            "language": "sw",
        }
      }


.. http:get:: /ureporters/(str:backend)/(str:user_address)/polls/current

   Retrieve a decription of the current poll, or a ``null`` poll if
   no poll is currently available.

   This should return either the current registration poll if the
   Ureporter isn't registered, or the poll the Ureporter should be
   responding to now if they are registered.

   :reqheader Accept: Should be ``application/json``.
   :reqheader Authorization: Optional HTTP Basic authentication.

   :param str backend:
       The RapidSMS / U-Report backend the user is utilizing (e.g.
       ``vumi_go_ussd`` or ``vumi_go_voice``).
   :param str address:
       The address of the user (e.g. ``+256775551122``).

   :resheader Content-Type: ``application/json``.

   :statuscode 200: no error
   :statuscode 404: no user found

   **Description of the JSON response attributes**:

   The JSON response contains a ``poll`` object with the following attributes:

   * ``id``: The poll id.
   * ``language``: The two-letter language code specifying the language used
     by the ``name``, ``question`` and ``default_response`` fields.
   * ``name``: The name of the poll (in the Ureporter's preferred language).
   * ``question``: The poll text (in the Ureporter's preferred language).
   * ``question_voice``: A URL from which a sound file containing a custom
     reading of the ``question`` may be retrieved, or ``null``. See below for
     further details.
   * ``start_date``: The date and time on which the poll began (or will begin).
   * ``end_date``: The date and time on which the poll ended (or will end).
   * ``is_registration``: ``true`` for polls that are part of
     registration, ``false`` otherwise.
   * ``type``: The data type of responses to the question. See below for
     the possible values.
   * ``default_response``: The ``default_response`` is the default text to
     send to submissions to this poll or ``null`` if there is no default.
   * ``default_response_voice``: A URL from which a sound file containing a
     custom reading of the ``default_response`` may be retrieved, or ``null``.
     If ``default_response`` is ``null``, this should also be ``null``.
     See below for further details.
   * ``response_type``: Whether the poll may be answered multiple times or
     not. See below for possible values.

   The ``language`` parameter should be a two-letter language code
   as defined in ISO 639-1. It may **not** be ``null``.

   The ``start_date`` and ``end_date`` fields should be ISO 8601 and
   RFC 3339 compatible UTC timestamps or ``null``.

   Allowed values for ``type``:

   * ``text`` (``t`` in RapidSMS polls)
   * ``numeric`` (``n`` in RapidSMS polls)
   * ``location`` (``l`` in RapidSMS polls)
   * ``none`` (see below)
   * ``other`` (all other RapidSMS polls)

   Updates to this API may extend the list of allowed ``type`` values.

   Polls of type ``none`` require no response from the user and responses
   to such polls should not be submitted to UReport. These polls are
   informational messages (and are typically used during registration).

   Allowed values for ``response_type``:

   * ``allow_all`` (``a`` in RapidSMS polls)
   * ``allow_one`` (``o`` in RapidSMS polls)

   The values of ``question_voice`` or ``default_response_voice`` may be
   a URL from which a sound file maybe be retrieved or ``null``. If the
   value is a URL, a GET request to the URL should return a sound file in
   ``.ogg``, ``.mp3`` or ``.wav`` format along with an appropriate
   ``Content-Type`` header. The ``.ogg`` format using one of the Xiph.org
   free codecs (Speex, Vorbis, Opus or FLAC) is recommended.

   If ``question_voice`` or ``default_response_voice`` is ``null`` and
   the backend in use is a voice backend, the API client is expected
   to use a suitable text-to-speech engine to generate a fallback
   sound file from the poll ``question`` or ``default_response`` as
   appropriate.

   **Example request**:

   .. sourcecode:: http

      GET /ureporters/vumi_go_sms/+256775551122/polls/current
      Host: example.com
      Accept: application/json

   **Example response (success, current poll available)**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
        "success": true,
        "poll": {
          "id": "1234",
          "language": "en",
          "name": "Poll 1",
          "question": "What is your quest?",
          "question_voice": "http://www.example.com/poll1234.ogg",
          "start_date": "2012-04-23T18:25:43.511Z",
          "end_date": null,
          "is_registration": false,
          "type": "text",
          "default_response": null,
          "default_response_voice": null,
          "response_type": "allow_all",
        }
      }

   **Example response (success, no current poll available)**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
        "success": true,
        "poll": null,
      }


.. http:get:: /ureporters/(str:backend)/(str:user_address)/polls/topics

   Return a list of the current topics poll results are available for.

   :reqheader Accept: Should be ``application/json``.
   :reqheader Authorization: Optional HTTP Basic authentication.

   :param str backend:
       The RapidSMS / U-Report backend the user is utilizing (e.g.
       ``vumi_go_ussd`` or ``vumi_go_voice``).
   :param str address:
       The address of the user (e.g. ``+256775551122``).

   :resheader Content-Type: ``application/json``.

   :statuscode 200: no error

   **Description of the JSON response attributes**:

   The ``poll_topics`` are a JSON list of topics for which there are
   currently polls. Each poll topic consists of:

   * a ``poll_id`` which is the unique id of the poll for the topic.
   * a ``label`` which is a human-readable description of the topic
     in the referred language of the Ureporter specified in the URL.

   **Example request**:

   .. sourcecode:: http

      POST /ureporters/vumi_go_sms/+256775551122/polls/topics
      Host: example.com
      Accept: application/json

   **Example response (success)**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
        "success": true,
        "poll_topics: [
          {
            "poll_id": "poll-1234",
            "label": "Topic A",
          },
          {
            "poll_id": "poll-5678",
            "label": "Topic B",
          }
        ]
      }


.. http:post:: /ureporters/(str:backend)/(str:user_address)/poll/(str:poll_id)/responses/

   Submit a result for a poll.

   :reqheader Accept: Should be ``application/json``.
   :reqheader Authorization: Optional HTTP Basic authentication.

   :param str backend:
       The RapidSMS / U-Report backend the user is utilizing (e.g.
       ``vumi_go_ussd`` or ``vumi_go_voice``).
   :param str address:
       The address of the user (e.g. ``+256775551122``).
   :param str poll_id:
       The ``id`` of the poll the response is being submitted to.

   :jsonparam str response:
       The text the UReporter responded with.

   :resheader Content-Type: ``application/json``.

   :statuscode 200: no error
   :statuscode 404: poll not found

   **Description of the JSON response attributes**:

   The ``accepted`` parameter is true if the response was accepted
   as valid (i.e. the poll is complete) or ``false`` if the
   response was invalid.

   The ``response`` is either additional text to send to the
   Ureporter, or ``null``.

   **Example request**:

   .. sourcecode:: http

      POST /ureporters/vumi_go_sms/+256775551122/poll/poll-1234/responses/
      Host: example.com
      Accept: application/json

      {
        "response": "response text"
      }

   **Example response (success)**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
        "success": true,
        "result": {
          "accepted": true,
          "response": "Thank you for answering the poll."
        }
      }


.. http:get:: /ureporters/(str:backend)/(str:user_address)/poll/(str:poll_id)/summary

   Returns a summary of the poll results.

   :reqheader Accept: Should be ``application/json``.
   :reqheader Authorization: Optional HTTP Basic authentication.

   :param str backend:
       The RapidSMS / U-Report backend the user is utilizing (e.g.
       ``vumi_go_ussd`` or ``vumi_go_voice``).
   :param str address:
       The address of the user (e.g. ``+256775551122``).
   :param str poll_id:
       The ``id`` of the poll to retrieve a summary for.

   :resheader Content-Type: ``application/json``.

   :statuscode 200: no error
   :statuscode 404: poll not found

   **Description of the JSON response attributes**:

   A ``poll_result`` has the following attributes:

   * ``total_responses`` which is a count of the total number of
     responses received.

   * ``responses`` which is a list summarizing the received
     responses. Each summary entry has a:

     * ``label`` which gives a human-readable name for the response in
       the Ureporters preferred language.

     * ``count`` which gives the number of times this response was
       received.

   The percentage of times each response was received should be
   ``(count / total_responses) * 100``.

   **Example request**:

   .. sourcecode:: http

      POST /ureporters/vumi_go_sms/+256775551122/poll/poll-1234/summary
      Host: example.com
      Accept: application/json

   **Example response (success)**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
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


.. http:post:: /ureporters/(str:backend)/(str:user_address)/reports/

   Submit a Ureport.

   :reqheader Accept: Should be ``application/json``.
   :reqheader Authorization: Optional HTTP Basic authentication.

   :param str backend:
       The RapidSMS / U-Report backend the user is utilizing (e.g.
       ``vumi_go_ussd`` or ``vumi_go_voice``).
   :param str address:
       The address of the user (e.g. ``+256775551122``).

   :resheader Content-Type: ``application/json``.

   :statuscode 200: no error
   :statuscode 404: ureporter not found

   **Description of the JSON response attributes**:

   The ``accepted`` parameter is true if the response was accepted
   as valid (i.e. the poll is complete) or ``false`` if the
   response was invalid.

   The ``response`` is either additional text to send to the
   Ureporter, or ``null``.

   **Example request**:

   .. sourcecode:: http

      POST /ureporters/vumi_go_sms/+256775551122/reports/
      Host: example.com
      Accept: application/json

      {
        "report": "resport text"
      }

   **Example response (success)**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
        "success": true,
        "result": {
          "accepted": true,
          "response": "Thank you for your report."
        }
      }
