import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ReviewExcerpt = () => {
  return (
    <li className="rounded-3xl border-t border-slate-700 bg-slate-800 p-6">
      <div className="mb-2 flex items-center gap-3">
        <img
          className="max-h-11 rounded-full"
          alt="user image"
          src="https://icon-library.com/images/google-user-icon/google-user-icon-21.jpg"
        />
        <div>
          <p className="font-bold">Kajetan Kowalski</p>
          <p className=" text-slate-400">Mar 23</p>
        </div>

        <div className="ml-auto flex flex-col items-center gap-1">
          <AiOutlineHeart size={25} />
          {/* <AiFillHeart size={25} className="fill-red-500" /> */}
          <p className="text-sm text-slate-400">23k</p>
        </div>
      </div>

      <p className="leading-8 text-slate-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam dolore
        adipisci fugiat voluptatibus repellat nihil exercitationem dolores alias
        ad?
      </p>
    </li>
  );
};

export default ReviewExcerpt;
