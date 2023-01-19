interface Props {
  progress: number
}

export function ProgressBar(props: Props) {
  return (
    <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
      <div
        role="progressbar"
        aria-label='Progress of habits completed in this day'
        aria-valuenow={props.progress}
        className='h-3 rounded-lg bg-violet-600'
        style={{ width: `${props.progress}%`}}
      />
    </div>
  )
}