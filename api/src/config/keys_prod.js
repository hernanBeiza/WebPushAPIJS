module.exports = {
   mongoURI: 'mongodb://web-push:webpush123@ds213053.mlab.com:13053/web-push',
   privateKey: 'lKdSLVEOfY58wlKffyzUcd_TG-nZLJe_d6Ehiv-t0go' || process.env.VAPID_PRIVATE_KEY,
   publicKey: 'BI4SvuJUErZVSZkTOS88w1W5uyuPQzXBgZ_FaUpXg3D6CMReI6IMyQeNj3vkwlkX2uX89BP5iyBfpUwqff-Ti20' || process.env.VAPID_PUBLIC_KEY
}