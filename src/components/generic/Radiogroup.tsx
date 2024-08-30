export interface RadiogroupItem {
  label: string;
  value: string;
}

export interface RadiogroupProps {
  items: RadiogroupItem[];
  value: RadiogroupItem;
  onChange: (val: RadiogroupItem) => void;
}

export default function Radiogroup({
  items,
  value,
  onChange,
}: RadiogroupProps) {
  let key = new Date().getTime().toString();
  return (
    <div className="accent-primary-500">
      {items?.map((item, index) => (
        <div key={index} className="mb-2 flex items-center gap-4">
          <input
            type="radio"
            name={key}
            value={value.value}
            onChange={(e) => onChange(item)}
            className="h-4 w-4"
          />
          <div className="text-lg font-medium">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
