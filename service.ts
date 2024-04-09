import axios, { AxiosInstance } from 'axios'

export interface GreenSMSParams {
    to: string
    txt: string
    from: string
}

export interface GreenSMSCredentials {
    user: string
    pass: string
}

export default class GreenSMS {
    private readonly baseUrl: string = 'https://api3.greensms.ru/sms'
    private readonly apiAxiosInstance: AxiosInstance
    private credentials: GreenSMSCredentials

    constructor(
        credentials: GreenSMSCredentials,
    ) {
        this.apiAxiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        this.credentials = credentials
    }

    public async sendSms(params: GreenSMSParams): Promise<void> {
        try {
            const response = await this.apiAxiosInstance.post('/send', {
                    ...this.credentials,
                    ...params,
                },
            )

            const logMsg: string =
                response.status === 200
                    ? `SMS sent successfully. Response: ${response.data}`
                    : `Failed to send SMS. Status: ${response.status}`

            console.info(logMsg)
        } catch (error) {
            console.error(`Failed to send SMS. Error: ${error}`)
        }
    }
}

export class GreenSMSBuilder {
    init(params: GreenSMSCredentials): GreenSMS {
        return new GreenSMS(params)
    }
}