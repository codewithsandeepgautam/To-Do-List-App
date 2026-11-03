const make = (children) =>
  function Icon({ size = 20, ...props }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
        {children}
      </svg>
    );
  };

export const SearchIcon = make(<><circle cx="11" cy="11" r="7.5" /><path d="m20.5 20.5-4-4" /></>);
export const TrashIcon = make(<path d="M4 6h16M9 6V4h6v2M6 6l1 14h10l1-14M10 10v6M14 10v6" />);
export const EditIcon = make(<><path d="M11 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6" /><path d="M18.5 3.5a2 2 0 0 1 2.9 2.9L12 15.8 8 17l1.2-4z" /></>);
export const PlusIcon = make(<path d="M12 5v14M5 12h14" />);
export const CloseIcon = make(<path d="M6 6l12 12M18 6 6 18" />);
export const ClockIcon = make(<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>);
export const CalendarIcon = make(<><rect x="3.5" y="5" width="17" height="15" rx="1.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>);
export const CheckIcon = make(<path d="m5 12.5 4.5 4.5L19 7.5" />);
export const CrossIcon = make(<path d="M7 7l10 10M17 7 7 17" />);
export const BackIcon = make(<path d="M19 12H5m6-6-6 6 6 6" />);
export const ChevronIcon = make(<path d="m6 9 6 6 6-6" />);
