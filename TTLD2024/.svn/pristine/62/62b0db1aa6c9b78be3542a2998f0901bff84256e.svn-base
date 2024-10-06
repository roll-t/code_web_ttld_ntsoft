//========================================================
// Author: Nguyễn Hoàng Kha
// Date: 05/01/2023
// Summary: Kiểm tra dữ liệu nhập vào
// Trả về true nếu dữ liệu hợp lệ, ngược lại trả về false
/* =======================================================
// Sử dụng:
var validate = new NTSValidate('#form');
if (validate.check()) {
    // dữ liệu hợp lệ
    // tiến hành submit form
}
else {
    // dữ liệu không hợp lệ
}
*/

class NTSValidate {
    msgRequired = '{0} không được để trống!';
    msgMinlength = 'Vui lòng nhập tối thiểu {0} ký tự!';
    msgMaxlength = 'Vui lòng nhập tối đa {0} ký tự!';
    msgMinDate = '{0} phải nhỏ hơn {1}!';
    msgMaxDate = '{0} phải lớn hơn {1}!';
    msgEmail = 'Email không đúng định dạng!';
    msgPattern = '{0} không đúng định dạng!';
    msgSpecial = '{0} không chứa kí tự đặc biệt!';

    patternEmail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    constructor(selector) {
        if ($(selector).length > 0) {
            this.form = $(selector);
        }
        else {
            throw new Error('Không tìm thấy form');
        }
    }
    showError(element, msg) {
        NTS.canhbao(msg);
        element.focus();
        // element.addClass('is-invalid');
        // element.next('.invalid-feedback').remove();
        // element.after(`<div class="invalid-feedback">${msg}</div>`);
    }

    hideError(element) {
        // element.removeClass('is-invalid');
        // element.next('.invalid-feedback').remove();
    }

    getLabel(element) {
        let label = element.prev('label').text();
        if (label == '') {
            label = element.parent().parent().find('label').text();
        }            
        return label;
    }
    validateDate(str) {
        var ngay = str.substring(0, 2);
        var thang = str.substring(3, 5);
        var nam = str.substring(6, 10);
        if (str.length != 10) {
            return false;
        }
        if (ngay < 1 || ngay > 31) {
            return false;
        }
        if (thang < 1 || thang > 12) {
            return false;
        }
        if (nam < 1900 || nam > 2100) {
            return false;
        }
        if (thang == 4 || thang == 6 || thang == 9 || thang == 11) {
            if (ngay > 30) {
                return false;
            }
        }
        if (thang == 2) {
            if (ngay > 29) {
                return false;
            }
            if (ngay == 29) {
                if (nam % 4 != 0) {
                    return false;
                }
                if (nam % 100 == 0 && nam % 400 != 0) {
                    return false;
                }
            }
        }
        return true;
    }

    compareDate(date1, date2) {
        // chuyển date1 về Date
        if (date1.length == 4)
            date1 = new Date("01/01/" + date1);
        else {
            if (date1.length == 7)
                date1 = new Date(date1.substring(0, 2) + "/01/" + date1.substring(3, 7));
            else if (date1.length == 10)
            // date1 is dd/mm/yyyy
                date1 = new Date(date1.substring(3,5)+"/"+date1.substring(0,2)+"/"+date1.substring(6,10));
            else
                return false;
        }

        // chuyển date2 về Date
        if (date2.length == 4)
            date2 = new Date("01/01/" + date2);
        else {
            if (date2.length == 7)
                date2 = new Date(date2.substring(0, 2) + "/01/" + date2.substring(3, 7));
            else if (date2.length == 10)
                date2 = new Date(date2.substring(3,5)+"/"+date2.substring(0,2)+"/"+date2.substring(6,10));
            else
                return false;
        }

        // so sánh
        if (date1 > date2)
            return 1;
        else if (date1 < date2)
            return -1;
        else
            return 0;
    }

    check() {
        // required
        let element_required = this.form.find('input[required], textarea[required]');
        var isValid = true;
        element_required.each((i, element) => {
            let input = $(element);
            let value = input.val();
            if (value == '') {
                isValid = false;
                let label = this.getLabel(input);
                this.showError(input, this.msgRequired.replace('{0}', label));
                return isValid;
            } else {
                this.hideError(input);
            }
        });
        if(!isValid){
            return isValid;
        }

        // select required
        let element_select_required = this.form.find('select[required]');
        element_select_required.each((i, element) => {
            let input = $(element);
            let value = input.val();
            if (value == '') {
                isValid = false;
                let label = this.getLabel(input);
                this.showError(input, this.msgRequired.replace('{0}', label));

                input.focus();
                input.select2('open');

                return isValid;
            } else {
                this.hideError(input);
            }
        });

        if(!isValid){
            return isValid;
        }
        // minlength
        let element_minlength = this.form.find('input[minlength], textarea[minlength]');
        element_minlength.each((i, element) => {
            let input = $(element);
            let value = input.val();
            let minlength = input.attr('minlength');
            if (value.length < minlength) {
                isValid = false;
                this.showError(input, this.msgMinlength.replace('{0}', minlength));
                return isValid;
            } else {
                this.hideError(input);
            }
        });
        if(!isValid){
            return isValid;
        }

        // // minDate
        // let element_minDate = this.form.find('input[data-min-date]');
        // element_minDate.each((i, element) => {
        //     let minDate = $(element);
        //     let id = minDate.attr('data-min-date');
        //     let maxDate = this.form.find(`input[data-max-date="${id}"]`);
        //     if (this.compareDate(minDate.val(), maxDate.val()) == 1) {
        //         isValid = false;
        //         let labelMinDate = minDate.prev('label').text();
        //         let labelMaxDate = maxDate.prev('label').text();
        //         this.showError(minDate, this.msgMinDate.replace('{0}', labelMinDate).replace('{1}', labelMaxDate));
        //         return isValid;
        //     } else {
        //         this.hideError(minDate);
        //     }
        // });

        // maxDate
        let element_maxDate = this.form.find('input[data-max-date]');
        element_maxDate.each((i, element) => {
            let maxDate = $(element);
            let id = maxDate.attr('data-max-date');
            let minDate = this.form.find(`input[data-min-date="${id}"]`);

            if (this.compareDate(minDate.val(), maxDate.val()) == 1) {
                isValid = false;
                let labelMinDate = this.getLabel(minDate);
                let labelMaxDate = this.getLabel(maxDate);
                this.showError(maxDate, this.msgMaxDate.replace('{0}', labelMaxDate).replace('{1}', labelMinDate));
                return isValid;
            } else {
                this.hideError(maxDate);
            }
        });

        if(!isValid){
            return isValid;
        }

        // pattern
        let element_pattern = this.form.find('input[pattern]');
        element_pattern.each((i, element) => {
            let input = $(element);
            let value = input.val();
            let pattern = input.attr('pattern');
            let regex = new RegExp(pattern);
            if (!regex.test(value)) {
                isValid = false;
                this.showError(input, this.msgPattern);
                return isValid;
            } else {
                this.hideError(input);
            }
        });
        if(!isValid){
            return isValid;
        }

        // email
        let element_email = this.form.find('input[type="email"]');
        element_email.each((i, element) => {
            let input = $(element);
            let value = input.val();

            if (value != '') {
                let regex = new RegExp(this.patternEmail);
                if (!regex.test(value)) {
                    isValid = false;
                    this.showError(input, this.msgEmail);
                    return isValid;
                } else {
                    this.hideError(input);
                }
            } 
        });
        if(!isValid){
            return isValid;
        }

        // date
        let element_date = this.form.find('input.date-picker');
        element_date.each((i, element) => {
            let input = $(element);
            let value = input.val();
            if (value != '' && !this.validateDate(value)) {
                isValid = false;
                this.showError(input, this.msgDate);
                return false;
            } else {
                this.hideError(input);
            }
        });
        return isValid;
    }

    trim() {
        let element_required = this.form.find('input[required], textarea[required]');
        element_required.each((i, element) => {
            let input = $(element);
            input.val(input.val().trim());
        });
        return this;
    }

    checkSpecial() {
        //Kiểm tra ký tự đặc biệt
        const specialCharRegex = /[!@#$^_[\]{}'"\\|<>?]/;
        let element_required = this.form.find('input[type=text], textarea');
        var isSpecial = true;
        element_required.each((i, element) => {
            let input = $(element);
            let value = input.val();
            if (specialCharRegex.test(value)) {
                isSpecial = false;
                let label = this.getLabel(input);
                this.showError(input, this.msgSpecial.replace('{0}', label));
                return isSpecial;
            } else {
                this.hideError(input);
            }
        });
        if (!isSpecial) {
            return isSpecial;
        }
        return isSpecial;
    }
}
