import { useDispatch } from 'react-redux';
import { addContact, getConatcts } from 'redux/contactsSlice';
import { useSelector } from 'react-redux';

import css from './ContactForm.module.css';

export const ContactForm = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(getConatcts);

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const numder = e.target.elements.number.value;
    const isInContacts = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${name} is already in contacts`);
      e.target.reset();
      return;
    }
    dispatch(addContact(name, numder));
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.contactForm}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div>
        <label htmlFor="number">Number</label>
        <input
          id="number"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button type="submit">Add contact</button>
    </form>
  );
};
