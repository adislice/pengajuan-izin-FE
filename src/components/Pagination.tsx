interface PaginationProps {
  links: any[],
  onBtnClick: (url: string) => void
}
export default function Pagination({ links, onBtnClick }: PaginationProps) {
  return (
    <div className="inline-flex -space-x-px text-sm">
      {links.map(link => (
        <button key={link.label} onClick={() => onBtnClick(link.url)} className={`flex items-center justify-center px-3 h-8 first:rounded-s last:rounded-e ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${link.active ? 'text-blue-600 bg-blue-50' : ''}`}>
          <span dangerouslySetInnerHTML={{ __html: link.label }}></span>
        </button>
      ))}

    </div>
  )
}