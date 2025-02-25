// components/molecules/DateRangeFilter.js
import { DateInput } from '../atoms/Input';

export const DateRangeFilter = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  return (
    <div className="flex space-x-4">
      <DateInput
        label="Start Date"
        name="startDate"
        value={startDate}
        onChange={onStartDateChange}
        placeholder="Pilih tanggal mulai"
      />
      <DateInput
        label="End Date"
        name="endDate"
        value={endDate}
        onChange={onEndDateChange}
        placeholder="Pilih tanggal akhir"
      />
    </div>
  );
};