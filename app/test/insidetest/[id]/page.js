'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Page(props) {
    const { params, searchParams } = props
    console.log(props)
    const path = usePathname()
    const { id, name, checkoutId, backPath } = searchParams
    return (<div style={{ display: "flex", flexDirection: "column" }}>
        page {id} - {name}
        <Link href={{
            pathname: `${path}/${checkoutId}`,
            query: { id, name, checkoutId, backPath }
        }}>Checkout</Link>

        <button>
            <Link href={backPath} >
                Go Back
            </Link>


        </button>
    </ div>)
}

