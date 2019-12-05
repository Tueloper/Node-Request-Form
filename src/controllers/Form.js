const Form = require("./../models/Form");
// const Mailer = require('./../services/EmailSender');
const ExcelTrigger = require('./../services/excel-setup');

module.exports = {
    async sendMessage(req, res) {
        try {
            const form = new Form(req.body);
            await form.save();
            ExcelTrigger(form)
            //sending mail to my email
            // Mailer(form);

            res.status(200).send({form})
        } catch (e) {
            res.status(404).send(e.message)
        }
    }
}