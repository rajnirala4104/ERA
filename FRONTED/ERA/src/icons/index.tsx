import React from "react";

interface classes {
   classess?: string;
}

export const LikeIcon: React.FC<classes> = (props) => {
   return (
      <svg
         stroke="currentColor"
         className={props.classess}
         fill="currentColor"
         strokeWidth="0"
         viewBox="0 0 1024 1024"
         height="1em"
         width="1em"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"></path>
      </svg>
   );
};

export const UnLikeIcon: React.FC<classes> = (props) => {
   return (
      <svg
         className={props.classess}
         stroke="currentColor"
         fill="currentColor"
         strokeWidth="0"
         viewBox="0 0 1024 1024"
         height="1em"
         width="1em"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z"></path>
      </svg>
   );
};

export const CommentIcon: React.FC<classes> = (props) => {
   return (
      <svg
         className={props.classess}
         stroke="currentColor"
         fill="currentColor"
         strokeWidth="0"
         viewBox="0 0 24 24"
         height="1em"
         width="1em"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path d="M7 7H17V9H7zM7 11H14V13H7z"></path>
         <path d="M20,2H4C2.897,2,2,2.897,2,4v18l5.333-4H20c1.103,0,2-0.897,2-2V4C22,2.897,21.103,2,20,2z M20,16H6.667L4,18V4h16V16z"></path>
      </svg>
   );
};

export const HomeIcon: React.FC<classes> = (props) => {
   return (
      <svg
         className={props.classess}
         stroke="currentColor"
         fill="currentColor"
         strokeWidth="0"
         viewBox="0 0 1024 1024"
         height="1em"
         width="1em"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path>
      </svg>
   );
};

export const ChatIcon: React.FC<classes> = (props) => {
   return (
      <svg
         className={props.classess}
         stroke="currentColor"
         fill="currentColor"
         strokeWidth="0"
         viewBox="0 0 16 16"
         height="1em"
         width="1em"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            fillRule="evenodd"
            d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
         ></path>
      </svg>
   );
};

export const UserProfileIcon: React.FC<classes> = (props) => {
   return (
      <svg
         className={props.classess}
         stroke="currentColor"
         fill="currentColor"
         strokeWidth="0"
         viewBox="0 0 448 512"
         height="1em"
         width="1em"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
      </svg>
   );
};

export const CloseIcon: React.FC<classes> = (props) => {
   return (
      <svg
         className={props.classess}
         stroke="currentColor"
         fill="currentColor"
         strokeWidth="0"
         viewBox="0 0 1024 1024"
         height="1em"
         width="1em"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
      </svg>
   );
};

export const EditIcon: React.FC<classes> = (props) => {
   return (
      <svg
         className={props.classess}
         stroke="currentColor"
         fill="currentColor"
         strokeWidth="0"
         viewBox="0 0 1024 1024"
         height="1em"
         width="1em"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"></path>
      </svg>
   );
};

export const LogoutIcon: React.FC<classes> = (props) => {
   return (
      <svg
         className={props.classess}
         stroke="currentColor"
         fill="currentColor"
         strokeWidth="0"
         viewBox="0 0 24 24"
         height="1em"
         width="1em"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path d="M16 13L16 11 7 11 7 8 2 12 7 16 7 13z"></path>
         <path d="M20,3h-9C9.897,3,9,3.897,9,5v4h2V5h9v14h-9v-4H9v4c0,1.103,0.897,2,2,2h9c1.103,0,2-0.897,2-2V5C22,3.897,21.103,3,20,3z"></path>
      </svg>
   );
};

export const PlusIcon: React.FC<classes> = (props) => {
   return (
      <svg
         className={props.classess}
         stroke="currentColor"
         fill="currentColor"
         strokeWidth="0"
         viewBox="0 0 16 16"
         height="1em"
         width="1em"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            fill-rule="evenodd"
            d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z"
            clip-rule="evenodd"
         ></path>
      </svg>
   );
};

export const SendIcon: React.FC<classes> = (props) => {
   return (
      <svg
         stroke="currentColor"
         className={props.classess}
         fill="currentColor"
         strokeWidth="0"
         viewBox="0 0 24 24"
         height="1em"
         width="1em"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            fill="none"
            stroke="#000"
            stroke-width="2"
            d="M22,3 L2,11 L20.5,19 L22,3 Z M10,20.5 L13,16 M15.5,9.5 L9,14 L9.85884537,20.0119176 C9.93680292,20.5576204 10.0751625,20.5490248 10.1651297,20.009222 L11,15 L15.5,9.5 Z"
         ></path>
      </svg>
   );
};

export const DeleteIcon: React.FC<classes> = (props) => {
   return (
      <svg
         stroke="currentColor"
         className={props.classess}
         fill="currentColor"
         strokeWidth="0"
         viewBox="0 0 1024 1024"
         height="1em"
         width="1em"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"></path>
      </svg>
   );
};
