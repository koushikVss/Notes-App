
'use client';
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

const getDetails = () => {
    return [
        {
            id: 1, name: "koushik", checkoutId: 12
        },
        {
            id: 2, name: "jomu", checkoutId: 13
        },
        {
            id: 3, name: "Dod", checkoutId: 14
        }, {
            id: 4, name: "Sicha", checkoutId: 15
        },
        {
            id: 5, name: "Boti", checkoutId: 16
        }
    ]
}
export default function page() {
    const pathName = usePathname()
    const details = getDetails()
    return (
        <>
            <h1>Current Path : {pathName}</h1>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                    Inside test page
                </div>
                <Link href="/">Go to main</Link>
                <Link href="/test">Goto test</Link>
                {
                    details.map(detail =>
                        // <Link href={`/test/insidetest/${detail.id}`}>Page {detail.id}</Link>
                        <Link href={{ pathname: `/test/insidetest/${detail.id}`, query: { ...detail, backPath: pathName } }}>Page {detail.id}</Link>
                    )
                }

            </div>
        </>
    )

}

