import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { 
  ChevronLeft, 
  ChevronRight, 
  PanelLeft, 
  Search, 
  Share, 
  Plus, 
  Copy, 
  ShieldHalf, 
  MoveRight
} from "lucide-react";
import { blogPosts } from "#constants";

const Safari = () => {
  return (
    <>
      <div id="window-header" className="flex items-center p-2">
        {/* Window control buttons */}
        <WindowControls target="safari" />

        {/* Sidebar toggle */}
        <PanelLeft className="ml-10 icon" />

        {/* Navigation arrows */}
        <div className="flex items-center gap-2 ml-5">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        {/* Search bar */}
        <div className="flex-1 flex items-center justify-center gap-3">
          <ShieldHalf className="icon" />
          <div className="search flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full w-[60%]">
            <Search className="icon" />
            <input
              type="text"
              placeholder="Search or enter website name"
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-5 ">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      <div className="blog">
        <h2>My Developer Blog</h2>
        <div className="space-y-8">
          {blogPosts.map (({id,image,title,date,link}) => (
            <div key={id} className="blog-post">
              <div className="col-span-2">
                <img src={image} alt={title} />
              </div>
              <div className="content">
                <p>{date}</p>
                <h3>{title}</h3>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Check out the full post <MoveRight className ="icon-hover"/>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Wrap the Safari window with a higher-order component
const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
