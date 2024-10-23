import { GuestBookEntry } from './GuestBook';

const GuestBookCard = ({ guestBook }: { guestBook: GuestBookEntry }) => {
  return (
    <div className='bg-red-100'>
      <div>
        <span>x</span>
      </div>
      <div>{guestBook.name}</div>
      <div>{guestBook.content}</div>
    </div>
  );
};

export default GuestBookCard;
