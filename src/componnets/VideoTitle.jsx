const VideoTitle= ({ title, overview })=>{
    return  (
    <div className="pt-54 px-12 absolute w-screen aspect-video bg-gradient-to-r from-black">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="py-2 text-sm w-1/3 text-white">{overview}</p>
        <div className="">
            <button className="bg-white text-black p-1 px-6 text-sm rounded-lg hover:bg-opacity-80 cursor-pointer">▶ PLAY</button>
            <button className="bg-gray-500 text-white mx-1 p-1 px-6 text-sm rounded-lg cursor-pointer ">ⓘ More Info</button>
        </div>
    </div>
    );
};

export default VideoTitle;