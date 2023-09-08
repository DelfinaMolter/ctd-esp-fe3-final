import { faqsData } from 'dh-marvel/components/faqs/faqsData'
import { Data} from 'interface/faqs'
import { NextApiRequest, NextApiResponse } from 'next'


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if (req.method === "GET") {
        const faq = faqsData.length
        if(faq === 0) {
            return res.status(404).json({ message: `Proximamente` })
        }
        return res.status(200).json(faqsData)
    } else {
        res.status(400).json({ message: "Método no permitido" })
    }

}