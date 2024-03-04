export const cloudproviders:Provider[] = [
    {
        id:1,
        name:"Google Drive",
        image:"/google_drive.png",
        available:true,
        staus:"available",
        authType:"oauth",
        credParams:[]
    },
    {
        id:2,
        name:"DropBox",
        image:"/dropbox.png",
        available:true,
        staus:"available",
        authType:"oauth",
        credParams:[]
    },
    {
        id:3,
        name:"OneDrive",
        image:"/onedrive.png",
        available:true,
        staus:"available",
        authType:"credentials",
        credParams:[]
    },
    {
        id:4,
        name:"AWS S3",
        image:"/S3.svg",
        available:true,
        staus:"available",
        authType:"credentials",
        credParams:['accessKeyId','secretAccessKey']
    },
    {
        id:5,
        name:"Cloudflare R2",
        image:"/cloudflare.svg",
        available:true,
        staus:"available",
        authType:"credentials",
        credParams:['accessKeyId','secretAccessKey']
    },
    {
        id:6,
        name:"Wasabi",
        image:"/wasabi.png",
        available:true,
        staus:"available",
        authType:"credentials",
        credParams:['accessKeyId','secretAccessKey']
    },
    {
        id:7,
        name:"PCloud",
        image:"/Pcloud.png",
        available: false,
        staus:"available",
        authType:"credentials",
        credParams:[]
    },
    
]