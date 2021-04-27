"use strict"
// Tabs
window.addEventListener("DOMContentLoaded", function() {

  let tab        = document.querySelectorAll(".main__menu__tab"),
      menu       = document.querySelector(".top-menu"),
      tabContent = document.querySelectorAll(".tabcontent");

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
				tabContent[i].classList.remove("show");
				tabContent[i].classList.add("hide");
		}
	}
  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains("hide")) {
        tabContent[b].classList.remove("hide");
				tabContent[b].classList.add("show");
    }
  }

  menu.addEventListener("click", function(event) {
    let target = event.target;
    if (target && target.classList.contains("main__menu__tab")) {
      for (let i=0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });
});
// Tabs
// Мобильное меню
window.addEventListener("DOMContentLoaded", function() {
	let mobileBtn    = document.querySelector(".mobile__menu__btn > .btn"),
			mobileMenuUl = document.querySelector("#mobileMenu");

	mobileBtn.onclick = function () {
		if (mobileMenuUl.classList.contains("hide")) {
			mobileMenuUl.classList.remove("hide");
			mobileMenuUl.classList.add("mobile__menu_active");
		} else {
			mobileMenuUl.classList.add("hide");
		}
	};
});

window.addEventListener("DOMContentLoaded", function() {

	let mobileTab    = document.querySelectorAll(".mobile__menu__tab"),
			mobileMenu   = document.querySelector(".mobile__menu"),
			tabContent   = document.querySelectorAll(".tabcontent"),
			mobileMenuUl = document.querySelector("#mobileMenu");

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
				tabContent[i].classList.remove("show");
				tabContent[i].classList.add("hide");
				mobileMenuUl.classList.add("hide");
		}
	}
	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains("hide")) {
				tabContent[b].classList.remove("hide");
				tabContent[b].classList.add("show");
		}
	}

	mobileMenu.addEventListener("click", function(event) {
	let target = event.target;
		if (target && target.classList.contains("mobile__menu__tab")) {
			for (let i = 0; i < mobileTab.length; i++) {
				if (target == mobileTab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});
});
// Мобильное меню
// Расчет погрешности УУТЭ
function measurement() {
	let supplyPipe     = document.querySelector("#supplyPipe"),
			returnPipeline = document.querySelector("#returnPipeline"),
			faultText      = document.querySelector("#faultText"),
			clearButton    = document.querySelector("#clearButton"),
			result,
			fault;

  result = +returnPipeline.value * 100 / +supplyPipe.value;

  if (result > 100) {
    fault = result - 100;
  } else {
    fault = 100 - result;
  }
	if (fault < 4) {
    faultText.innerHTML = ("Погрешность в пределах нормы и равна " + (fault.toFixed(1)) + "%");
  } else if (fault >= 4){
    faultText.innerHTML = ("Погрешность выше нормы и равна " + (fault.toFixed(1)) + "%");
	} else {
		faultText.innerHTML = ("Данные не введены или введены не корректно.");
	}
	clearButton.onclick = function(e) {
			supplyPipe.value = "";
			returnPipeline.value = "";
			faultText.innerHTML = "";
		};
}
// Расчет погрешности УУТЭ
// Расчет инфильтрации
function infiltration() {
	let buildingHeight      = document.querySelector("#buildingHeight"),
			buildingTemperature = document.querySelector("#buildingTemperature"),
			outdoorTemperature  = document.querySelector("#outdoorTemperature"),
			infiltrationText    = document.querySelector("#infiltration"),
			clearInfltration    = document.querySelector("#clearInfltration"),
			windSpeed           = document.querySelector("#windSpeed"),
			infiltration        = 0.01 * (Math.sqrt(19.6 * +buildingHeight.value * (1 - ((273 + +outdoorTemperature.value) / (273 + +buildingTemperature.value))) + Math.pow(windSpeed.value, 2)));

	if (buildingHeight.value == "" || outdoorTemperature.value == "" || buildingTemperature.value == "" || windSpeed.value == "") {
		infiltrationText.innerHTML = ("Данные не введены или введены не корректно.");
	} else {
		infiltrationText.innerHTML     = ("Коэффициент инфильтрации равен: " + (+infiltration.toFixed(6)));
		infiltrationTherm.value        = +infiltration.toFixed(6);
		buildingTemperatureTherm.value = +buildingTemperature.value;
		outdoorTemperatureTherm.value  = +outdoorTemperature.value;
	}

	clearInfltration.onclick = function(e) {
		buildingHeight.value = "";
		buildingTemperature.value = "";
		outdoorTemperature.value = "";
		windSpeed.value = "";
		infiltrationText.innerHTML = "";
	};
}
// Расчет инфильтрации
// Расчет нагрузки системы отопления
function volume() {
	let builtUpArea          = document.querySelector("#builtUpArea"),
			buildingHeightTherm  = document.querySelector("#buildingHeightTherm"),
			clearVolume          = document.querySelector("#clearVolume"),
			volumeResult         = +builtUpArea.value * +buildingHeightTherm.value;

			buildingVolume.value = +(volumeResult);

			clearVolume.onclick = function(e) {
				builtUpArea.value = "";
				buildingHeightTherm.value = "";
			};
}

function thermal() {
	let correctionFactor          = document.querySelector("#correctionFactor"),
			buildingVolume            = document.querySelector("#buildingVolume"),
			specHeatCharacteristic    = document.querySelector("#specHeatCharacteristic"),
			buildingTemperatureTherm  = document.querySelector("#buildingTemperatureTherm"),
			outdoorTemperatureTherm   = document.querySelector("#outdoorTemperatureTherm"),
			infiltrationTherm         = document.querySelector("#infiltrationTherm"),
			thermalText               = document.querySelector("#thermal"),
			clearThermal              = document.querySelector("#clearThermal"),
			thermal                   = +correctionFactor.value * +buildingVolume.value * +specHeatCharacteristic.value * (+buildingTemperatureTherm.value - +outdoorTemperatureTherm.value) * (1 + +infiltrationTherm.value) * 0.000001;

	if (buildingVolume.value == "" || specHeatCharacteristic.value == "" || buildingTemperatureTherm.value == "" || outdoorTemperatureTherm.value == "" || infiltrationTherm.value =="") {
		thermalText.innerHTML = ("Данные не введены или введены не корректно.");
	} else {
		thermalText.innerHTML = ("Тепловая нагрузка системы отопления: Q= " + (+thermal.toFixed(6)) + " Гкал/час");
	}
	clearThermal.onclick = function(e) {
		correctionFactor.value = "";
		buildingVolume.value = "";
		specHeatCharacteristic.value = "";
		buildingTemperatureTherm.value = "";
		outdoorTemperatureTherm.value = "";
		infiltrationTherm.value = "";
		thermalText.innerHTML = "";
	};
}
// Расчет нагрузки системы отопления
// Расчет нагрузки приточной вентиляции
function volumeVent() {
	let builtUpAreaVent          = document.querySelector("#builtUpAreaVent"),
			buildingHeightVent       = document.querySelector("#buildingHeightVent"),
			clearVolumeVent          = document.querySelector("#clearVolumeVent"),
			volumeVentResult         = +builtUpAreaVent.value * +buildingHeightVent.value;

			buildingVentVolume.value = +volumeVentResult;

			clearVolumeVent.onclick = function(e) {
				builtUpAreaVent.value = "";
				buildingHeightVent.value = "";
			};
			console.log(volumeVentResult);
}

function ventilation() {
	let correctionVent              = document.querySelector("#correctionVent"),
			buildingVentVolume          = document.querySelector("#buildingVentVolume"),
			specVentCharacteristic      = document.querySelector("#specVentCharacteristic"),
			buildingTemperatureVent     = document.querySelector("#buildingTemperatureVent"),
			outdoorTemperatureVent      = document.querySelector("#outdoorTemperatureVent"),
			ventilationOutput           = document.querySelector("#ventilationOutput"),
			clearventilation            = document.querySelector("#clearventilation"),
			vent                        = +correctionVent.value * +buildingVentVolume.value * +specVentCharacteristic.value * ( +buildingTemperatureVent.value - +outdoorTemperatureVent.value) * 0.000001;

	if (correctionVent.value == "" || buildingVentVolume.value == "" || specVentCharacteristic.value == "" || buildingTemperatureVent.value == "" || outdoorTemperatureVent.value =="") {
		ventilationOutput.innerHTML = ("Данные не введены или введены не корректно.");
	} else {
		ventilationOutput.innerHTML = ("Тепловая нагрузка приточной вентиляции: Q= " + (+vent.toFixed(6)) + " Гкал/час");
	}
	clearventilation.onclick = function(e) {
		correctionVent.value = "";
		buildingVentVolume.value = "";
		specVentCharacteristic.value = "";
		buildingTemperatureVent.value = "";
		outdoorTemperatureVent.value = "";
		ventilationOutput.innerHTML = "";
	};
}
// Расчет нагрузки приточной вентиляции

// Средняя часовая тепловая нагрузка ГВС
// объем горячей воды относительно сечения
function gvsvolume() {
	let pipeDiameter    = document.querySelector("#pipeDiameter"),
			waterSpeed      = document.querySelector("#waterSpeed"),
			gvsVolumeOutput = document.querySelector("#gvsVolumeOutput"),
			clearGvsVolume  = document.querySelector("#clearGvsVolume"),
			gvsvolumeResult = (3.14 * Math.pow(pipeDiameter.value, 2)) / 4 * 3600 * +waterSpeed.value;


	if (pipeDiameter.value == "" || waterSpeed.value == "") {
		gvsVolumeOutput.innerHTML = ("Данные не введены или введены не корректно.");
	} else {
		gvsVolumeOutput.innerHTML = ("Объем горячей воды равен: " + (+gvsvolumeResult.toFixed(6)) + " м3/час");
		volumeGvs.value = +gvsvolumeResult;
	}
	clearGvsVolume.onclick = function(e) {
		pipeDiameter.value = "";
		waterSpeed.value = "";
		gvsVolumeOutput.innerHTML = "";
	};
}
// объем горячей воды относительно сечения
// тепловая нагрузка ГВС относительно сечения
function gvsVolPower() {
	let volumeGvs        = document.querySelector("#volumeGvs"),
			densityOfWater   = document.querySelector("#densityOfWater"),
			waterTemperature = document.querySelector("#waterTemperature"),
			volumeGvsOutput  = document.querySelector("#volumeGvsOutput"),
			clearGvsVolPower = document.querySelector("#clearGvsVolPower"),
			volumeGvsResult  = (+volumeGvs.value * +densityOfWater.value * (+waterTemperature.value - 5)) / 1000;

	if (volumeGvs.value == "" || densityOfWater.value == "" || waterTemperature.value == "") {
		volumeGvsOutput.innerHTML = ("Данные не введены или введены не корректно.");
	} else {
		volumeGvsOutput.innerHTML = ("Тепловая нагрузка системы ГВС равна " + (+volumeGvsResult.toFixed(6)) + " Гкал/час");
	}
	clearGvsVolPower.onclick = function(e) {
		volumeGvs.value = "";
		densityOfWater.value = "";
		waterTemperature.value ="";
		volumeGvsOutput.innerHTML = "";
	};
}
// тепловая нагрузка ГВС относительно сечения
// Средняя часовая тепловая нагрузка ГВС

// Количество принятой тепловой энергии
// Отопление, вентиляция и кондиционирование
function consumedtherm() {
	let	heatLoadCeThermal     = document.querySelector("#heatLoadCeThermal"),
			buildTempCeThermal    = document.querySelector("#buildTempCeThermal"),
			outdoorTempCalc       = document.querySelector("#outdoorTempCalc"),
			outdoorTempFact       = document.querySelector("#outdoorTempFact"),
			workingHoursCeThermal = document.querySelector("#workingHoursCeThermal"),
			consumedTherm         = document.querySelector("#consumedTherm"),
			clearConsumedTherm    = document.querySelector("#clearConsumedTherm"),
			consumedthermResult   = +heatLoadCeThermal.value * ((+buildTempCeThermal.value - +outdoorTempFact.value) / (+buildTempCeThermal.value - +outdoorTempCalc.value)) * +workingHoursCeThermal.value;

	if (heatLoadCeThermal.value == "" || buildTempCeThermal.value == "" || outdoorTempFact.value == "" || outdoorTempCalc.value == "" || workingHoursCeThermal.value == "") {
		consumedTherm.innerHTML = ("Данные не введены или введены не корректно.");
	} else {
		consumedTherm.innerHTML = ("Количество принятой тепловой энергии: Q= " + (+consumedthermResult.toFixed(6)) + " Гкал");
	}
	clearConsumedTherm.onclick = function(e) {
		heatLoadCeThermal.value = "";
		buildTempCeThermal.value = "";
		outdoorTempFact.value = "";
		outdoorTempCalc.value = "";
		workingHoursCeThermal.value = "";
		consumedTherm.innerHTML = "";
	};
}
// Отопление, вентиляция и кондиционирование
// ГВС
function consumedgvs() {
	let	heatLoadCeGvs     = document.querySelector("#heatLoadCeGvs"),
			coldWaterTempFact = document.querySelector("#coldWaterTempFact"),
			coldWaterTempCalc = document.querySelector("#coldWaterTempCalc"),
			hotWaterTempCalc  = document.querySelector("#hotWaterTempCalc"),
			workingHoursCeGvs = document.querySelector("#workingHoursCeGvs"),
			consumedgvs       = document.querySelector("#consumedgvs"),
			clearConsumedGvs  = document.querySelector("#clearConsumedGvs"),
			consumedgvsResult = +heatLoadCeGvs.value * +workingHoursCeGvs.value * ((+hotWaterTempCalc.value - +coldWaterTempFact.value) / (+hotWaterTempCalc.value - +coldWaterTempCalc.value));

	if (heatLoadCeGvs.value == "" || workingHoursCeGvs.value == "" || hotWaterTempCalc.value == "" || coldWaterTempFact.value == "" || coldWaterTempCalc.value == "") {
		consumedgvs.innerHTML = ("Данные не введены или введены не корректно.");
	} else {
		consumedgvs.innerHTML = ("Количество принятой тепловой энергии: Q= " + (+consumedgvsResult.toFixed(6)) + " Гкал");
	}

	clearConsumedGvs.onclick = function(e) {
		heatLoadCeGvs.value = "";
		workingHoursCeGvs.value = "";
		hotWaterTempCalc.value = "";
		coldWaterTempFact.value = "";
		coldWaterTempCalc.value = "";
		consumedgvs.innerHTML = "";
	};
}
// ГВС
// Технологические нужды
function consumedteсh() {
	let heatLoadCeTeсh     = document.querySelector("#heatLoadCeTeсh"),
			workingHoursCeTech = document.querySelector("#workingHoursCeTech"),
			clearConsumedTeсh  = document.querySelector("#clearConsumedTeсh"),
			consumedteсh       = document.querySelector("#consumedteсh"),
			consumedteсhResult = +heatLoadCeTeсh.value * +workingHoursCeTech.value;

	if (heatLoadCeTeсh.value == "" || workingHoursCeTech.value == "") {
		consumedteсh.innerHTML = ("Данные не введены или введены не корректно.");
	} else {
		consumedteсh.innerHTML = ("Количество принятой тепловой энергии: Q= " + (+consumedteсhResult.toFixed(6)) + " Гкал");
	}

	clearConsumedTeсh.onclick = function(e) {
		heatLoadCeTeсh.value = "";
		workingHoursCeTech.value = "";
		consumedteсh.innerHTML = "";
	};
}
// Технологические нужды
// Количество принятой тепловой энергии

// Кэффициент элеваторного узла
function elevator() {
	let flowTemperature         = document.querySelector("#flowTemperature"),
			returnTemperature       = document.querySelector("#returnTemperature"),
			temperatureAfterMixing  = document.querySelector("#temperatureAfterMixing"),
			mixingRatio             = document.querySelector("#mixingRatio"),
			clearElevator           = document.querySelector("#clearElevator"),
			mixingResult            = (+flowTemperature.value - +temperatureAfterMixing.value) / (+temperatureAfterMixing.value - +returnTemperature.value);

	if (flowTemperature.value == "" || returnTemperature.value == "" || temperatureAfterMixing.value == "") {
		mixingRatio.innerHTML = ("Данные не введены или введены не корректно.");
	} else {
		mixingRatio.innerHTML = ("Кэффициент элеваторного узла: " + (+mixingResult.toFixed(6)));
	}
	clearElevator.onclick = function(e) {
		flowTemperature.value = "";
		returnTemperature.value = "";
		temperatureAfterMixing.value = "";
		mixingRatio.innerHTML = "";
	};
}
// Кэффициент элеваторного узла

// Расчет тепловых потерь

function heatLoss() {
	let powerLoss          = document.querySelector("#powerLoss"),
			lossOneOutput      = document.querySelector("#lossOneOutput"),
			lossSixOutput      = document.querySelector("#lossSixOutput"),
			powerLossSevenFull = +powerLoss.value / 7,
			lossSevenRound     = Math.round(powerLossSevenFull * 1000) / 1000,
			lossSixFull        = lossSevenRound * 6,
			lossSixRound       = Math.round(lossSixFull * 1000) / 1000,
			lossOneFull        = +powerLoss.value - lossSixRound,
			lossOneRound       = Math.round(lossOneFull * 1000) / 1000;
			lossOneSameFull    = lossSixRound / 6,
			lossOneSameRound   = Math.round(lossOneSameFull * 1000) / 1000;

	if (powerLoss.value == "") {
		lossOneOutput.innerHTML = ("Данные не введены или введены не корректно.");
	} else {
		lossOneOutput.innerHTML = ("Потери в седьмой месяц: " + (lossOneRound));
	}

	if (powerLoss.value == "") {
		lossSixOutput.innerHTML = ("Данные не введены или введены не корректно.");
	} else {
		lossSixOutput.innerHTML = ("Потери в остальные шесть месяцев: " + (lossOneSameRound));
	}
	clearHeatLoss.onclick = function(e) {
		powerLoss.value = "";
		lossOneOutput.innerHTML = "";
		lossSixOutput.innerHTML = "";
	};
}
// Расчет тепловых потерь
// Разделение тепловой нагрузки
function heatSeparation() {
	let heatSeparationMain   = document.querySelector("#heatSeparationMain"),
			sqrSeparationMain    = document.querySelector("#sqrSeparationMain"),
			sqrSeparationOne     = document.querySelector("#sqrSeparationOne"),
			sqrOutputOne         = document.querySelector("#sqrOutputOne"),
			sqrSeparationTwo     = document.querySelector("#sqrSeparationTwo"),
			sqrOutputTwo         = document.querySelector("#sqrOutputTwo"),
			sqrSeparationThree   = document.querySelector("#sqrSeparationThree"),
			sqrOutputThree       = document.querySelector("#sqrOutputThree"),
			sqrSeparationFour    = document.querySelector("#sqrSeparationFour"),
			sqrOutputFour        = document.querySelector("#sqrOutputFour"),
			sqrSeparationFive    = document.querySelector("#sqrSeparationFive"),
			sqrOutputFive        = document.querySelector("#sqrOutputFive"),
			sqrSeparationSix     = document.querySelector("#sqrSeparationSix"),
			sqrOutputSix         = document.querySelector("#sqrOutputSix"),
			separationMainOutput = document.querySelector("#separationMainOutput"),

			sqrSeparationOneCalc = Math.round(((+sqrSeparationOne.value * +heatSeparationMain.value) / +sqrSeparationMain.value) * 10000000) / 10000000,

			sqrSeparationTwoCalc = Math.round(((+sqrSeparationTwo.value * +heatSeparationMain.value) / +sqrSeparationMain.value) * 10000000) / 10000000,

			sqrSeparationThreeCalc = Math.round(((+sqrSeparationThree.value * +heatSeparationMain.value) / +sqrSeparationMain.value) * 10000000) / 10000000,

			sqrSeparationFourCalc = Math.round(((+sqrSeparationFour.value * +heatSeparationMain.value) / +sqrSeparationMain.value) * 10000000) / 10000000,

			sqrSeparationFiveCalc = Math.round(((+sqrSeparationFive.value * +heatSeparationMain.value) / +sqrSeparationMain.value) * 10000000) / 10000000,

			sqrSeparationSixCalc = Math.round(((+sqrSeparationSix.value * +heatSeparationMain.value) / +sqrSeparationMain.value) * 10000000) / 10000000,

			sqrMainResidue = +sqrSeparationMain.value - +sqrSeparationOne.value - +sqrSeparationTwo.value - +sqrSeparationThree.value - +sqrSeparationFour.value - +sqrSeparationFive.value - +sqrSeparationSix.value;

			heatMainResidue = Math.round(((+sqrMainResidue * +heatSeparationMain.value) / +sqrSeparationMain.value) * 10000000) / 10000000;

	if (sqrMainResidue == 0) {
		separationMainOutput.innerHTML = ("Оставшаяся нагрузка: 0;" + " Оставшаяся площадь: " + (sqrMainResidue));

		sqrOutputOne.innerHTML   = sqrSeparationOneCalc;
		sqrOutputTwo.innerHTML   = sqrSeparationTwoCalc;
		sqrOutputThree.innerHTML = sqrSeparationThreeCalc;
		sqrOutputFour.innerHTML  = sqrSeparationFourCalc;
		sqrOutputFive.innerHTML  = sqrSeparationFiveCalc;
		sqrOutputSix.innerHTML   = sqrSeparationSixCalc;
	} else {
		separationMainOutput.innerHTML = ("Оставшаяся нагрузка: " + (heatMainResidue) + " Оставшаяся площадь: " + (sqrMainResidue));

		sqrOutputOne.innerHTML   = sqrSeparationOneCalc;
		sqrOutputTwo.innerHTML   = sqrSeparationTwoCalc;
		sqrOutputThree.innerHTML = sqrSeparationThreeCalc;
		sqrOutputFour.innerHTML  = sqrSeparationFourCalc;
		sqrOutputFive.innerHTML  = sqrSeparationFiveCalc;
		sqrOutputSix.innerHTML   = sqrSeparationSixCalc;
	}

	if (heatSeparationMain.value == "" || sqrSeparationMain.value == "") {
		separationMainOutput.innerHTML = ("Данные не введены или введены не корректно.");

		sqrOutputOne.innerHTML   = ("Нет данных");
		sqrOutputTwo.innerHTML   = ("Нет данных");
		sqrOutputThree.innerHTML = ("Нет данных");
		sqrOutputFour.innerHTML  = ("Нет данных");
		sqrOutputFive.innerHTML  = ("Нет данных");
		sqrOutputSix.innerHTML   = ("Нет данных");
	}

	clearheatSeparation.onclick = function(e) {
		heatSeparationMain.value = "";
		sqrSeparationMain.value = "";
		sqrSeparationOne.value = "";
		sqrSeparationTwo.value = "";
		sqrSeparationThree.value = "";
		sqrSeparationFour.value = "";
		sqrSeparationFive.value = "";
		sqrSeparationSix.value = "";
		sqrOutputOne.innerHTML = "";
		sqrOutputTwo.innerHTML = "";
		sqrOutputThree.innerHTML = "";
		sqrOutputFour.innerHTML = "";
		sqrOutputFive.innerHTML = "";
		sqrOutputSix.innerHTML = "";
		separationMainOutput.innerHTML = "";
	};
}
// Разделение тепловой нагрузки
// returnetotop
window.addEventListener("DOMContentLoaded", function() {

	let returnToTop = document.querySelector('.returnToTop');

	function trackScroll() {
		let scrolled    = window.pageYOffset,
				coords      = document.documentElement.clientHeight;

		if (scrolled > coords) {
			returnToTop.classList.add('active');
		} else {
			returnToTop.classList.remove('active');
		}
	}
	function backToTop() {
		if (window.pageYOffset > 0) {
			window.scrollBy(0, -80);
			setTimeout(backToTop, 0);
		}
	}
	window.addEventListener('scroll', trackScroll);
	returnToTop.addEventListener('click', backToTop);
});
// returnetotop
// Показать таблицу
window.addEventListener("DOMContentLoaded", function() {

	let showBtn    = document.querySelectorAll(".showbtn");
			// calcTable  = document.querySelectorAll(".calctable");

	for (let i = 0; i < showBtn.length; i++) {
		showBtn[i].addEventListener("click", function() {
			let calcTable = this.nextElementSibling;
			if (calcTable.style.display != "block") {
				calcTable.style.display = "block";
			} else {
				calcTable.style.display = "none";
			}
		});
		}
});
// Показать таблицу