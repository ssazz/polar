// polar grapher v. 0.2.1 BETA
// Polar(      kontekst, środek_x, środek_y, promien układu, ilość_jednostek, jednostka, podziałka_jednostki)
function Polar(context,  Px,       Py,       R,              r_max,           unit,      lower_unit) {
	var c = context;
	this.unit = unit;
	this.lower_unit = lower_unit;

	this.drawcircles = function(thickness, color, color_label) {

		for (var d = 1; d <= Math.floor(r_max / unit) * lower_unit; d++) {
			c.beginPath();
			c.arc(Px, Py, d * unit / lower_unit / r_max * R, 0, 2 * Math.PI, false);
			c.closePath();
			c.lineWidth = (d % lower_unit) === 0 ? thickness : thickness / 3;
			c.strokeStyle = color;
			c.stroke();
		}

		for (var m = 1; m <= r_max; m++) {
			c.beginPath();
			c.arc(Px + m * unit / r_max * R, Py, 7, 0, 2 * Math.PI, false);
			c.fillStyle = color_label || 'white';
			c.fill();
		}

		c.font = "10pt Arial";
		c.fillStyle = '#ff0000';
		c.textAlign = "center";
		c.textBaseline = "middle";
		c.fillStyle = 'black';
		for (var t = 1; t <= r_max / unit; t++) {
			c.fillText("" + unit * t + "", Px + t * unit / r_max * R, Py);
		}

	};

	this.pivot = function(radius, color, type) {
		c.beginPath();
		c.arc(Px, Py, radius, 0, 2 * Math.PI, false);
		if (typeof(type) !== 'undefined' && type == 'fill') {
			c.fillStyle = color;
			c.fill();
		} else {
			c.strokeStyle = color;
			c.stroke();
		}
	}

	this.drawarms = function(major, minor, w_offset, z_offset, thickness, color, labels) {
		minor++;
		var counter = 360 / major * minor;
		var theta = major / minor / 180 * Math.PI;

		for (var f = 0; f <= counter; f++) {
			c.beginPath();
			c.moveTo(Px + Math.cos(theta * f) * w_offset, Py + Math.sin(theta * f) * w_offset);
			c.lineTo(Px + Math.cos(theta * f) * (R + z_offset), Py + Math.sin(theta * f) * (R + z_offset));
			c.lineWidth = f % minor === 0 ? thickness * 2 : thickness / 3;
			c.strokeStyle = color;
			c.stroke();
		}

		if (labels !== 'undefined' && labels == true) {
			var licznik, mianownik,
				tab = [2, 3, 5, 7];

			c.font = "10pt Arial";
			c.fillStyle = '#ff0000';
			c.textAlign = "center";
			c.textBaseline = "middle";

			for (var t = 1; t <= 360 / major; t++) {
				licznik = t * 2;
				mianownik = 360 / major;

				for (var w = 0; w < 4; w++) {
					while (licznik % tab[w] == 0 && mianownik % tab[w] == 0) {
						licznik /= tab[w];
						mianownik /= tab[w];
					}
				}

				c.fillStyle = 'black';
				c.fillText("" + (licznik == 1 ? "" : licznik) + "\u03C0" + (mianownik == 1 ? "" : "/" + mianownik) + "", Px + Math.cos(theta * minor * t) * (R + z_offset + 25), Py - Math.sin(theta * minor * t) * (R + z_offset + 25));
			}
		}
	};

	this.plot = function(xArr, yArr, color, width) {
		var dlugosc = xArr.length,
			scale = R / r_max;
		c.beginPath();
		c.moveTo(Px + xArr[0] * scale, Py + yArr[0] * -scale);
		for (var j = 1; j < dlugosc; j++) {
			c.lineTo(Px + xArr[j] * scale, Py + yArr[j] * -scale);
		}
		c.lineWidth = width;
		c.strokeStyle = color;
		c.stroke();
	};

	this.drawbackground = function(offset, color) {
		c.beginPath();
		c.arc(Px, Py, R + offset, 0, 2 * Math.PI, false);
		c.fillStyle = color;
		c.fill();
	};
}
