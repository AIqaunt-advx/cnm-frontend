import './globals.css'
import {Orbitron, Rajdhani, Exo_2} from 'next/font/google'
import {Providers} from './providers'

const orbitron = Orbitron({
    subsets: ['latin'],
    variable: '--font-orbitron',
    weight: [
        '400',
        '500',
        '600',
        '700',
        '800',
        '900'
    ]
})

const rajdhani = Rajdhani({
    subsets: ['latin'],
    variable: '--font-rajdhani',
    weight: [
        '300',
        '400',
        '500',
        '600',
        '700'
    ]
})

const exo2 = Exo_2({
    subsets: ['latin'],
    variable: '--font-exo2',
    weight: [
        '300',
        '400',
        '500',
        '600',
        '700',
        '800'
    ]
})

export const metadata = {
    title: 'CNM CSGO | Cognitive Neural Marketing',
    description: 'Cognitive Neural Marketing - CS:GO Advanced Trading Intelligence Platform'
}

export default function RootLayout({children} : {
    children : React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={
                `${
                    orbitron.variable
                } ${
                    rajdhani.variable
                } ${
                    exo2.variable
                } antialiased font-rajdhani`
            }>
                <Providers> {children} </Providers>
            </body>
        </html>
    )
}
