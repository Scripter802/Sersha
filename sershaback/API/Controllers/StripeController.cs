using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using Application.Stripe;


namespace API.Controllers
{
    public class StripeController: BaseController
    {
        public StripeController()
        {
            StripeConfiguration.ApiKey = "sk_test_51OA98hDTW8RXGzBArNMox1wf2NH2xKRJj5vNLMAxDFXnSzwZUXgo3cWfFAPlbpym9CSIbmkbvODoWF537ktf9Ymu00YbHzdg6I";
        }

        [AllowAnonymous]
        [HttpPost("create-checkout-session")]
        public ActionResult CreateCheckoutSession([FromBody] SubscriptionRequest request)
        {
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        Price = request.PriceId,
                        Quantity = 1,
                    },
                },
                Mode = "subscription",
                SuccessUrl = "https://game.sersha.ai/success?session_id={CHECKOUT_SESSION_ID}",
                CancelUrl = "https://game.sersha.ai/",
            };

            var service = new SessionService();
            Session session = service.Create(options);

            return Ok(new { sessionId = session.Id });


        }
    }
}