import { Cangkang, PitaOffline } from '@sahaja/ui'
import { Bell, CircleUserRound } from 'lucide-react'
import { Outlet, useLocation } from 'react-router'
import { t } from '../teks'
import { navSamping, navUtama } from './nav'
import { Tautan } from './Tautan'

const kelasAksi =
  'inline-flex size-touch items-center justify-center rounded-pill text-text hover:bg-bg'

export function CangkangPendamping() {
  const { pathname } = useLocation()
  return (
    <>
      <PitaOffline teks={t('umum.offline')} />
      <Cangkang
        merek={<span className="text-body-strong text-primary-strong">{t('aplikasi.nama')}</span>}
        navUtama={navUtama}
        navSamping={navSamping}
        jalurAktif={pathname}
        Tautan={Tautan}
        kunciSimpan="sahaja.pendamping.sidebar_ciut"
        label={{
          navUtama: t('cangkang.nav_utama'),
          ciutkan: t('cangkang.ciutkan'),
          bentangkan: t('cangkang.bentangkan'),
          lompatKeIsi: t('cangkang.lompat'),
        }}
        aksiAtas={
          <>
            <Tautan href="/notifikasi" className={kelasAksi}>
              <Bell aria-hidden className="size-6" />
              <span className="sr-only">{t('cangkang.notifikasi')}</span>
            </Tautan>
            <Tautan href="/akun" className={kelasAksi}>
              <CircleUserRound aria-hidden className="size-6" />
              <span className="sr-only">{t('cangkang.akun')}</span>
            </Tautan>
          </>
        }
      >
        <Outlet />
      </Cangkang>
    </>
  )
}
