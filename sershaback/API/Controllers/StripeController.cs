using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using Application.Stripe;
using System;


namespace API.Controllers
{
    public class StripeController: BaseController
    {
        public IConfiguration Configuration {get; set;}
        public StripeController(IConfiguration configuration)
        {
            Configuration = configuration;
            StripeConfiguration.ApiKey = Configuration.GetSection("APIKey").GetSection("Stripe").Value;
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
                 Discounts = new List<SessionDiscountOptions>
                {
                    new SessionDiscountOptions
                    {
                        Coupon = request.CouponID,
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