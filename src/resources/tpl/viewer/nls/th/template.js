define(
	 ({
		viewer: {
			common: {
				close: "ปิด"
			},
			loading: {
				long: "เริ่มเปิดแอพพลิเคชั่น",
				long2: "ขอบคุณที่รอ",
				failButton: "ลองใหม่"
			},
			signin: {
				title: "ต้องการยอมรับ",
				explainViewer: "กรุณาเข้าสู่ระบบด้วยบัญชีผู้ใช้บน% PORTAL_LINK% ในการเข้าถึงแอพลิเคชัน",
				explainBuilder: "กรุณาเข้าสู่ระบบด้วยบัญชีผู้ใช้บน PORTAL_LINK%% การกำหนดค่าโปรแกรมประยุกต์"
			},
			errors: {
				boxTitle: "เกิดข้อผิดพลาด",
				invalidConfig: "การกำหนดค่าไม่ถูกต้อง",
				invalidConfigNoApp: "ข้อผิดพลาดร้ายแรง: เว็บแผนที่ระบุการใช้งานไม่ได้ระบุใน index.html",
				unspecifiedConfigOwner: "ไม่มีการกำหนดอำนาจในการปรับแต่ง",
				invalidConfigOwner: "เจ้าของแอพพลิเคชั่นยังไม่ได้รับการให้สิทธิ",
				createMap: "ไม่สามารถสร้างแผนที่ได้",
				invalidApp: "ข้อผิดพลาดร้ายแรง: โปรแกรมไม่สามารถโหลด",
				appLoadingFail: "มีางอย่างผิดปกติ, %TPL_NAME% โหลดไม่สมบูรณ์",
				notConfiguredDesktop: "ยินดีต้อนรับเข้าสู่โปรแกรมประยุกต์บนเว็บ% TPL_NAME%. <br /> โปรแกรมจะยังไม่ได้กำหนดค่า",
				notConfiguredMobile: "ยินดีต้อนรับสู่โปรแกรมเว็บ TPL_NAME%% โปรแกรมไม่ได้กำหนดค่าและยังสร้างไม่ได้รับการสนับสนุนบนอุปกรณ์มือถือ",
				notAuthorized: "คุณยังไม่ได้รับอนุญาตให้เข้าถึงโปรแกรมนี้",
				noBuilderIE: "ตัวสร้างที่ไม่ได้รับการสนับสนุนบน Internet Explorer ก่อนรุ่น %VERSION%  %UPGRADE%",
				noViewerIE: "โปรแกรมประยุกต์ที่ไม่ได้รับการสนับสนุนบน Internet Explorer ก่อนรุ่น %VERSION%. %UPGRADE%",
				upgradeBrowser: "<a href='http://browsehappy.com/' target='_blank'>กรุณาอัพเดทเบราว์เซอร์ของคุณ</a>.",
				mapLoadingFail: "เกิดข้อผิดพลาดบางอย่างขึ้น ทำให้แผนที่ไม่สามารถเปิดขึ้นได้ถูกต้อง",
				signOut: "ลงชื่อออก"
			},
			mobileInfo: {
				legend: "คำอธิบาย",
				description: "คำบรรยาย",
				lblLegendMobileError: "ไม่สามารถแสดงคำอธิบายสัญลักษณ์ได้ กรุณาโหลดแอพพลิเคชันอีกครั้ง",
				lblLegendMobileErrorExplain: "คำอธิบายสัญลักษณ์ไม่สามารถแสดงผลได้ เมื่ออุปกรณ์แสดงผลในแนวตั้งหลังจากโหลดแอพพลิเคชั่น"
			},
			mobileFooter: {
				swipeInvite: "เลื่อนเพื่อเริ่มเรื่อง",
				lblNext: "ต่อไป",
				lblEnd: "คุณอ่านมาถึงตอนจบของเรื่องแล้ว"
			},
			headerFromCommon: {
				storymapsText: "A story map",
				builderButton: "แก้ไข",
				bitlyTooltip: "รับลิ้งแบบสั้นสำหรับโปรแกรมนี้",
				templateTitle: "ตั้งค่าหัวเรื่องเทมเพลต",
				templateSubtitle: "ตั้งค่าชื่อรองของเทมเพลต",
				share: "แชร์"
			},
			overviewFromCommon: {
				title: "ภาพรวมของแผนที่"
			},
			legendFromCommon: {
				title: "คำอธิบาย"
			},
			shareFromCommon: {
				copy: "คัดลอก",
				copied: "คัดลอก",
				open: "เปิด",
				embed: "ฝังลงในเว็บไซต์",
				embedExplain: "ใช้โค้ด HTML นี้ในการแทรกแอพพลิเคชั่นเข้าไปในหน้าเว็บ",
				size: "ขนาด (กว้าง/สูง):"
			}
        }
    })
);