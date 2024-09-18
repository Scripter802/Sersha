namespace Application.Stripe
{
    public class SubscriptionRequest
    {
        public string PriceId {get; set;}
        public string CouponID {get; set;}
    }
}