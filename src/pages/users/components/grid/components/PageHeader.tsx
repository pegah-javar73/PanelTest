import React from "react";
import { UserStatus } from "../../../enum";
import SearchAndFilter from "./SearchAndFilter";
import ActionButtons from "./ActionButtons";

interface PageHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: UserStatus | "all";
  setStatusFilter: (status: UserStatus | "all") => void;
  selectedUsersCount: number;
  onBulkDelete: () => void;
  onCreate: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  selectedUsersCount,
  onBulkDelete,
  onCreate,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search and Filter Section */}
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Action Buttons Section */}
        <ActionButtons
          selectedUsersCount={selectedUsersCount}
          onBulkDelete={onBulkDelete}
          onCreate={onCreate}
        />
      </div>
    </div>
  );
};

export default PageHeader;
