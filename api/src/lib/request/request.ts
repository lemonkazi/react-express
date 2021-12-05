import * as Ajv from 'ajv';

export default class Request {
    private eventBody: any;
    private jsonScheme: string;

    constructor(eventBody: any, jsonScheme: string) {
        this.eventBody = eventBody;
        this.jsonScheme = jsonScheme;
    }

    public validate() {
        //const ajv = Ajv({ allErrors: true });
        let ajv = new Ajv.default({ allErrors: true });
        const requestBody = this.eventBody;
        console.log(
            `validate with scheme = ${JSON.stringify(this.jsonScheme)} and body = ${JSON.stringify(
                requestBody,
            )}`,
        );
        const valid = ajv.validate(this.jsonScheme, requestBody);
        if (!valid) {
            console.log('not valid');
            let msg = '';
            for (const err of ajv.errors!) {
                msg += err.message + '. ';
            }
            throw new Error(`invalid request body: ${msg}`);
        }
        console.log('is valid');
        return requestBody;
    }
}
