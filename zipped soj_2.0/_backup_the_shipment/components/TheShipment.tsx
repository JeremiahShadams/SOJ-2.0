"use client";

import Hero from "@/components/sections/Hero";
import Stations from "@/components/sections/Stations";
import Customs from "@/components/sections/Customs";
import Depot from "@/components/sections/Depot";
import Dispatch from "@/components/sections/Dispatch";
import Delivery from "@/components/sections/Delivery";
import CrateModal from "@/components/CrateModal";

import { useShipmentEngine } from "@/hooks/useShipmentEngine";
import ShipmentNav from "@/components/ShipmentNav";
import ShipmentHUD from "@/components/ShipmentHUD";
import ShipmentBox from "@/components/ShipmentBox";
import ShipmentRoute from "@/components/ShipmentRoute";

export default function TheShipment() {
  const engine = useShipmentEngine();

  const {
    rootRef,
    routeSvgRef,
    pathRef,
    beltRef,
    rollersRef,
    boxRef,
    boxInnerRef,
    shadowRef,
    hudStatusRef,
    hudPctRef,
    hudNextRef,
    hudBarRef,
  } = engine.refs;

  const {
    entOn,
    entStamp,
    boxVisible,
    heroStamp,
    stamps,
    fired,
    signed,
    soundOn,
    crateOpen,
    navOpen,
    entDate,
  } = engine.state;

  const {
    setNavOpen,
    toggleSound,
    openCrate,
    closeCrate,
    onSigned,
    returnToTop,
    snd,
  } = engine.actions;

  return (
    <div ref={rootRef} style={{ position: "relative", minHeight: "100vh" }}>
      {/* ══════════ ENTRANCE ══════════ */}
      {entOn && (
        <div
          aria-hidden="true"
          style={{ position: "fixed", inset: 0, zIndex: 500, pointerEvents: "none" }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 360,
              height: 250,
              background:
                "repeating-linear-gradient(180deg,#DCD8CE 0 22px,#CFCBBF 22px 26px)",
              border: "3px solid var(--ink)",
              borderTop: "none",
              boxShadow: "10px 10px 0 rgba(26,26,26,.25)",
              animation: "doorUp .55s cubic-bezier(.6,0,.4,1) .5s both",
            }}
          >
            <div
              className="mono"
              style={{
                position: "absolute",
                bottom: 10,
                left: 0,
                right: 0,
                textAlign: "center",
                fontSize: 11,
                letterSpacing: ".14em",
                fontWeight: 700,
              }}
            >
              DOCK 01 - INBOUND
            </div>
          </div>
          {entStamp && (
            <div
              style={{
                position: "absolute",
                left: 24,
                bottom: 120,
                transform: "rotate(-8deg)",
              }}
            >
              <div
                className="stamp-rect"
                style={{
                  border: "3px solid var(--cargo-blue)",
                  color: "var(--cargo-blue)",
                  fontSize: 14,
                  letterSpacing: ".12em",
                  padding: "8px 16px",
                  boxShadow:
                    "inset 0 0 0 2px var(--concrete), inset 0 0 0 3.5px var(--cargo-blue)",
                }}
              >
                ORDER PLACED - {entDate}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════ COMPONENTS ══════════ */}
      <ShipmentNav
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        soundOn={soundOn}
        toggleSound={toggleSound}
      />

      <ShipmentHUD
        hudStatusRef={hudStatusRef}
        hudPctRef={hudPctRef}
        hudNextRef={hudNextRef}
        hudBarRef={hudBarRef}
      />

      <ShipmentRoute
        routeSvgRef={routeSvgRef}
        pathRef={pathRef}
        beltRef={beltRef}
        rollersRef={rollersRef}
      />

      <ShipmentBox
        boxRef={boxRef}
        boxInnerRef={boxInnerRef}
        shadowRef={shadowRef}
        boxVisible={boxVisible}
        stamps={stamps}
      />

      {/* ══════════ SECTIONS ══════════ */}
      <Hero heroStamp={heroStamp} />
      <div className="hazard" aria-hidden="true" />
      <Stations fired={fired} onOpenCrate={openCrate} />
      <div className="hazard" aria-hidden="true" />
      <Customs cleared={!!fired.customs} />
      <Depot snd={snd} />
      <div className="hazard" aria-hidden="true" />
      <Dispatch snd={snd} />
      <Delivery
        signed={signed}
        onSigned={onSigned}
        snd={snd}
        onReturnToTop={returnToTop}
      />

      {crateOpen && <CrateModal onClose={closeCrate} />}
    </div>
  );
}
