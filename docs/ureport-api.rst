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
  * :http:get:`/ureporters/(str:backend)/(str:user_address)/current_poll`
  * :http:post:`/ureporters/(str:backend)/(str:user_address)/submit_poll/(str:poll_id)`
  * :http:get:`/ureporters/(str:backend)/(str:user_address)/poll_result/(str:poll_id)`
  * :http:get:`/ureporters/(str:backend)/(str:user_address)/poll_topics`
  * :http:post:`/ureporters/(str:backend)/(str:user_address)/submit_report`


.. _response-format-overview:

Response format overview
------------------------

All response bodies will be JSON formatted and contain objects with at
least a key named ``success``. If the HTTP response code was in the
``200`` range, the value of ``success`` will be ``true``. Otherwise,
the value will be ``false``.

**Example response (succeess)**:

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

   .. warning::

      If anyone would like to suggest extra fields to return for the user,
      that would be useful.


.. http:get:: /ureporters/(str:backend)/(str:user_address)/current_poll

   Retrieve a decription of the current poll, or a ``null`` poll if
   no poll is currently available.

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

   **Example request**:

   .. sourcecode:: http

      GET /ureporters/vumi_go_sms/+256775551122/current_poll
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
          "name": "Poll 1",
          "question": "What is your quest?",
          "start_date": "2012-04-23T18:25:43.511Z",
          "end_date": null,
          "type": "t",
          "default_response": null,
          "response_type": "a",
        }
      }

   .. warning::

      We still need to add a parameter here for custom voice recordings.
      Maybe ``"wav": "http://example.com/voice/12345.wav"``? If no voice
      recording is available, Vumi will attempt to generate one.

   .. note::

      The ``start_date`` and ``end_date`` fields should be ISO 8601 and
      RFC 3339 compatible UTC timestamps or ``null``.

      A ``response_type`` is either ``a`` (for allow all) or ``o`` (for allow
      one).

      Common values of ``type`` are ``t`` (text), ``n`` (numeric),
      ``l`` (location) or ``r`` (registration), but other types may also exist.

      The ``default_response`` is the default text to send to submissions to
      this poll or ``null`` if there is no default.

   **Example response (success, no current poll available)**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
        "success": true,
        "poll": null,
      }


.. http:post:: /ureporters/(str:backend)/(str:user_address)/submit_poll/(str:poll_id)

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

   **Example request**:

   .. sourcecode:: http

      POST /ureporters/vumi_go_sms/+256775551122/submit_poll/poll-1234
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

   .. note::

      The ``accepted`` parameter is true if the response was accepted
      as valid (i.e. the poll is complete) or ``false`` if the
      response was invalid.

      The ``response`` is either additional text to send to the
      Ureporter, or ``null``.


.. http:get:: /ureporters/(str:backend)/(str:user_address)/poll_result/(str:poll_id)

   :reqheader Accept: Should be ``application/json``.
   :reqheader Authorization: Optional HTTP Basic authentication.

   :param str backend:
       The RapidSMS / U-Report backend the user is utilizing (e.g.
       ``vumi_go_ussd`` or ``vumi_go_voice``).
   :param str address:
       The address of the user (e.g. ``+256775551122``).
   :param str poll_id:
       The ``id`` of the poll the response is being submitted to.

   :resheader Content-Type: ``application/json``.

   :statuscode 200: no error
   :statuscode 404: poll not found

   **Example request**:

   .. sourcecode:: http

      POST /ureporters/vumi_go_sms/+256775551122/poll_result/poll-1234
      Host: example.com
      Accept: application/json

   **Example response (success)**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
        "success": true,
        "poll_result": {
          ...
        }
      }

      .. warning::

         We need to define what a poll result consists of.


.. http:get:: /ureporters/(str:backend)/(str:user_address)/poll_topics

   Return a list of the current topics polls are available for.

   :reqheader Accept: Should be ``application/json``.
   :reqheader Authorization: Optional HTTP Basic authentication.

   :param str backend:
       The RapidSMS / U-Report backend the user is utilizing (e.g.
       ``vumi_go_ussd`` or ``vumi_go_voice``).
   :param str address:
       The address of the user (e.g. ``+256775551122``).

   :resheader Content-Type: ``application/json``.

   :statuscode 200: no error

   **Example request**:

   .. sourcecode:: http

      POST /ureporters/vumi_go_sms/+256775551122/poll_topics
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



.. http:post:: /ureporters/(str:backend)/(str:user_address)/submit_report

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

   **Example request**:

   .. sourcecode:: http

      POST /ureporters/vumi_go_sms/+256775551122/submit_report
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
