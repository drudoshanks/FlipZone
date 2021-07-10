// https://ftgnow.com/testftg/api/register

import { create } from 'apisauce'
import WooCommerceAPI from 'react-native-woocommerce-api';

// define the api
const api = create({
    baseURL: 'https://ftgnow.com/testftg/api',
    headers: { Accept: 'application/vnd.github.v3+json' },
})

// start making calls
// api
//     .get('/repos/skellock/apisauce/commits')
//     .then(response => response.data[0].commit.message)
//     .then(console.log)

export const _WooCommerceAPI = new WooCommerceAPI({
    url: 'https://flipzone.co.in/', // Your store URL
    ssl: true,
    consumerKey: 'ck_6e32571e6c1c71ff8224641ec0804ddfd8fc8091', // Your consumer key
    consumerSecret: 'cs_c61b64fd7901b5cfcd0530de613725e1a18409e9', // Your consumer secret
    wpAPI: true, // Enable the WP REST API integration
    version: 'wc/v3', // WooCommerce WP REST API version
    queryStringAuth: true
  });

export function register(email: string, moblie: string, password: string) {
    return api.post('/register',
        {
            "AuthMobileNumber": moblie,
            "email": email,
            "AuthPassword": password
        },
        {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }
    )
}