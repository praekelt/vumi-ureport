.. UReport API for Vumi USSD sandbox application

UReport HTTP API
================

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

One of the initial backends will be voice with IVR.

API methods
-----------

.. http:get:: /users/(str:backend)/(str:user_address)

   Information on the given user.

   **Example request**:

   .. sourcecode:: http

      GET /users/vumi_go_sms/+256775551122
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
            ...
        }
      }

   **Example response (error)**:

   .. sourcecode:: http

      HTTP/1.1 404 NOT FOUND
      Content-Type: application/json

      {
        "success": false,
        "reason": "User not found"
      }

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

   .. called when a user first arrives at the Vumi Go voice/USSD menu (PDF 1)


.. http:get:: /users/(str:backend)/(str:user_address)/current_poll

   Retrieve a decription of the current poll.

   .. TODO: define JSON
   .. include poll_id

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

   .. called while registering a user via the Vumi Go voice/USSD menu (PDF 2)


.. http:post:: /users/(str:backend)/(str:user_address)/submit_poll

   Submit a result for a poll.

   .. TODO: define JSON

   :reqheader Accept: Should be ``application/json``.
   :reqheader Authorization: Optional HTTP Basic authentication.

   :param str backend:
       The RapidSMS / U-Report backend the user is utilizing (e.g.
       ``vumi_go_ussd`` or ``vumi_go_voice``).
   :param str address:
       The address of the user (e.g. ``+256775551122``).

   .. called while registering a user or submitting the current poll (PDF 2 and 4.1)


.. http:get:: /users/(str:backend)/(str:user_address)/poll_result

   .. poll_results(ureport_backend, address, poll_id)
   .. TODO: define JSON

   .. called after answering a poll or view poll results (PDF 4.2 and 5.1)


.. http:get:: /users/(str:backend)/(str:user_address)/poll_topics

   .. poll_topics(ureport_backend, address)
   .. TODO: JSON
   .. include poll_ids

   .. called to retrieve a list of polls results are available for (PDF 5)


.. http:get:: /users/(str:backend)/(str:user_address)/submit_report

   .. submit_report(ureport_backend, address, report)

   .. called when submitting a report (PDF 6)
