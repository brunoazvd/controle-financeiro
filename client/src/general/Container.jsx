export const Container = ({children, ...props}) => {
  return (
    <div className="w-6xl mx-auto" {...props}>
      {children}
    </div>
  )
}
