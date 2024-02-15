interface Pricing {
    name:String,
    popular:Boolean,
    price:Number,
    features:Array<String>,
}
export const PricingDetails : Pricing[]=[
    {
        name:"STARTER",
        price:0,
        popular:false,
        features:[
            "Cloud Providers :Google Drive",
            "Max Size : 100MB ",
            "Syncing : Basic Syncing",
            "Settings : Not Customizable"
        ],

    },
    {
        name:"PRO",
        price:99,
        popular:false,
        features:[
            "Cloud Providers :Google Drive, Cloudflare r2, One Drive",
            "Max Size : 1GB ",
            "Syncing : Basic Syncing",
            "Settings : Customizable",
            "Support : Basic"
        ],

    },
    {
        name:"BUSINESS",
        price:199,
        popular:true,
        features:[
            "Cloud Providers :Google Drive, Cloudflare r2, One Drive, Drop Box",
            "Max Size : 5GB ",
            "Syncing : Advanced Syncing",
            "Settings : Customizable",
            "Support : Priority"
        ],

    },
    {
        name:"SPECIAL",
        price:399,
        popular:false,
        features:[
            "Cloud Providers :All Cloud Providers",
            "Max Size : 10GB ",
            "Syncing : Advanced Syncing",
            "Settings : Customizable",
            "Support : Priority",
            "File Versioning "
        ],

    }
]