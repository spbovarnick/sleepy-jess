
export default function PageLayout(props) {
  return (
    <section>
      {props.children}
      {props.artModal}
    </section>
  )
}