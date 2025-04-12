import mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = async (req, res) => {
    console.log('Request body received:', req.body);  // Debug

    // Si req.body est vide
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Request body is missing'
        });
    }

    try {
        let newContact = new Contact(req.body);
        const contact = await newContact.save();

        return res.status(201).json({
            success: true,
            data: contact
        });
    } catch (err) {
        console.error('Error in addNewContact:', err);

        if (err.name === 'ValidationError') {
            const errors = {};

            for (const field in err.errors) {
                errors[field] = err.errors[field].message;
            }

            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        return res.status(500).json({
            success: false,
            message: 'An error occurred while creating the contact',
            error: err.message
        });
    }
};

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({}); // Utilisation d'async/await
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getContactWithID = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.contactId); // Use findById()
        
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateContact = async (req, res) =>{
    try{
        const contact = await Contact.findOneAndUpdate({_id:req.params.contactId},req.body,{new:true}); // Use findById()
        
        res.json(contact)
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findOneAndDelete({ _id: req.params.contactId });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json({ success: true, message: 'Successfully deleted contact', data: contact });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};