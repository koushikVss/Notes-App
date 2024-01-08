'use client'
import Link from "next/link"
import { useSearchParams } from "next/navigation"
export default function Page(props) {
    const { checkoutId,backPath } = props.searchParams
    const searchParams = useSearchParams()
    console.log(props.searchParams)
    console.log(searchParams.getAll("name"))
    return (
        <>
            Checkout  - {checkoutId}
            <button>
                <Link href={backPath} >
                    Go Back
                </Link>


            </button>
        </>

    )
}

