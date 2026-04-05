import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Input } from "antd";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
      <div className="mx-auto flex justify-between max-w-7xl items-center gap-4">
        {/* Logo */}
        <div className="flex shrink-0 items-center  gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="8" height="8" rx="1.5" fill="white" />
              <rect
                x="13"
                y="3"
                width="8"
                height="8"
                rx="1.5"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="3"
                y="13"
                width="8"
                height="8"
                rx="1.5"
                fill="white"
                opacity="0.7"
              />
              <rect x="13" y="13" width="8" height="8" rx="1.5" fill="white" />
            </svg>
          </div>
          <span className="hidden text-base font-semibold text-gray-800 sm:block">
            Wallify
          </span>
        </div>

        {/* Search */}
        <div className="flex !w-80">
          <Input
            prefix={<SearchOutlined className="text-gray-400" />}
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
        <div className="flex shrink-0 items-center gap-2">
          <Avatar
            size={32}
            icon={<UserOutlined />}
            style={{ background: "#1677ff" }}
          />
          <span className="hidden text-sm text-gray-600 sm:block">
            Akshay Gupta
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
