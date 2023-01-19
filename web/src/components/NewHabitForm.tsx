import { Check } from "phosphor-react";

export function NewHabitForm() {
  return (
    <form className="flex flex-col w-full mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        What's your commitment?
      </label>

      <input
        type="text"
        id="title"
        placeholder="Exercise, sleep well, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">what's the recurrence?</label>

      <button type="submit" className="mt-6 rounded-lg p-4 flex gap-3 items-center justify-center font-semibold bg-green-600 hover:bg-green-500">
        <Check size={20} weight="bold" />
        Confirm
      </button>
    </form>
  )
}