function Book({ id, title, author }) {
    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{title}</td>
                <td>{author}</td>
            </tr>
        </>
    )
}
export default Book
