import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Input } from "antd";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        {/* Logo */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="glow-pulse flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="3"
                width="8"
                height="8"
                rx="2"
                fill="white"
                opacity="0.9"
              />
              <rect
                x="13"
                y="3"
                width="8"
                height="8"
                rx="2"
                fill="white"
                opacity="0.6"
              />
              <rect
                x="3"
                y="13"
                width="8"
                height="8"
                rx="2"
                fill="white"
                opacity="0.6"
              />
              <rect
                x="13"
                y="13"
                width="8"
                height="8"
                rx="2"
                fill="white"
                opacity="0.9"
              />
            </svg>
          </div>
          <span className="hidden bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-lg font-bold text-transparent sm:block">
            Wallify
          </span>
        </div>

        {/* Search */}
        <div className="w-full max-w-xl">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search wallpapers..."
            size="large"
            allowClear
            onPressEnter={(e) => onSearch((e.target as HTMLInputElement).value)}
            onChange={(e) => {
              if (!e.target.value) onSearch("");
            }}
          />
        </div>

        {/* Profile */}
        <div className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 transition-colors hover:border-violet-500/50 hover:bg-white/5">
          <Avatar
            size={28}
            icon={<UserOutlined />}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            }}
          />
          <span className="hidden text-sm font-medium text-white/80 sm:block">
            Akshay Gupta
          </span>
        </div>
      </div>
    </header>
  );
};
export default Header;
