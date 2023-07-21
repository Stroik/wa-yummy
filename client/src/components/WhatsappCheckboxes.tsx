interface WhatsappCheckboxesProps {
  state: any[];
  setState: React.Dispatch<React.SetStateAction<any>>;
}

export const WhatsappCheckboxes = ({ state, setState }: WhatsappCheckboxesProps) => {
  return (
    <>
      <label className="label">
        <span className="label-text">Whatsapp que realizarán los envíos</span>
      </label>
      <div className="flex gap-2 overflow-x-auto py-4">
        {state.map((item) => (
          <label
            key={item.id}
            className="rounded-md border border-primary p-2 flex gap-2 justify-between items-center"
          >
            <span className="flex items-center gap-1">
              <i className="ri-whatsapp-line text-xl text-primary"></i>
              <span>{item.name}</span>
            </span>
            <input
              type="checkbox"
              value={item.id}
              onChange={() => setState((prev: any) => [...prev, item.id])}
              id={item.id}
              className="checkbox checkbox-primary"
            />
          </label>
        ))}
      </div>
    </>
  );
};
