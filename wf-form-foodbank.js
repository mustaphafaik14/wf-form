<script>
    function switchTab() {
        var labels = document.querySelectorAll('#donations_form > label');
        if (!wasTabHidden(labels)) {
            for (var i = 0; i < labels.length; i++) {
                var label = labels[i];
                var tabContent = document.getElementById(label.htmlFor + '_content');
                if (document.getElementById(label.htmlFor).checked) {
                    label.style = 'position:relative!important;top:0px!important;margin-right:5px!important;margin-bottom:-1px!important;padding:12px 20px!important;font-weight:600!important;font-size:14px!important;line-height:18px!important;height:18px!important;text-align:center!important;border-left-width:1px!important;border-left-style:solid!important;border-left-color:#C6C6C6!important;border-right-width:1px!important;border-right-style:solid!important;border-right-color:#C6C6C6!important;border-top-width:1px!important;border-top-style:solid!important;border-top-color:#C6C6C6!important;border-top-left-radius:10px!important;border-top-right-radius:10px!important;background-color:white!important;background:-moz-linear-gradient(0deg, white 0%, white 90%, #f4ebb9 90%, #f4ebb9 100%)!important;background: -webkit-linear-gradient(0deg, white 0%, white 90%, #f4ebb9 90%, #f4ebb9 100%)!important;background: linear-gradient(0deg, white 0%, white 90%, #f4ebb9 90%, #f4ebb9 100%)!important;float: none!important;box-sizing: content-box!important;display: inline-block!important;';
                    tabContent.style.setProperty('display', 'block', 'important');
                } else {
                    label.style = 'position:relative!important;top:1px!important;margin-right:5px!important;margin-bottom: 0px!important;padding:12px 20px!important;font-weight:600!important;font-size:14px!important;line-height:14px!important;height:14px!important;text-align:center!important;border-left-width:1px!important;border-left-style:solid!important;border-left-color:#C6C6C6!important;border-right-width:1px!important;border-right-style:solid!important;border-right-color:#C6C6C6!important;border-top-width:1px!important;border-top-style:solid!important;border-top-color:#C6C6C6!important;border-top-left-radius:10px!important;border-top-right-radius:10px!important;background-color:#E3E3E3!important;background-image:none!important;background-repeat:repeat!important;background-position:top left!important;background-attachment:scroll!important;float: none!important;box-sizing: content-box!important;display:inline-block!important';
                    tabContent.style.setProperty('display', 'none', 'important');
                }
            }
        }

    }

    function wasTabHidden(labels) {
        var hidden = false;
        for (var i = 0; i < labels.length; i++) {
            var label = labels[i];
            var tabContent = document.getElementById(label.htmlFor + '_content');
            if (label.getAttribute("hide") !== null) {
                label.style.setProperty('display', 'none', 'important');
                tabContent.style.setProperty('display', 'none', 'important');
                hidden = true;
            } else {
                label.style = 'position:relative!important;top:0px!important;margin-right:5px!important;margin-bottom:-1px!important;padding:12px 20px!important;font-weight:600!important;font-size:14px!important;line-height:18px!important;height:18px!important;text-align:center!important;border-left-width:1px!important;border-left-style:solid!important;border-left-color:#C6C6C6!important;border-right-width:1px!important;border-right-style:solid!important;border-right-color:#C6C6C6!important;border-top-width:1px!important;border-top-style:solid!important;border-top-color:#C6C6C6!important;border-top-left-radius:10px!important;border-top-right-radius:10px!important;background-color:white!important;background:-moz-linear-gradient(0deg, white 0%, white 90%, #f4ebb9 90%, #f4ebb9 100%)!important;background: -webkit-linear-gradient(0deg, white 0%, white 90%, #f4ebb9 90%, #f4ebb9 100%)!important;background: linear-gradient(0deg, white 0%, white 90%, #f4ebb9 90%, #f4ebb9 100%)!important;float: none!important;box-sizing: content-box!important;display: inline-block!important;';
                tabContent.style.setProperty('display', 'block', 'important');
            }
        }
        return hidden;
    }

    document.addEventListener("DOMContentLoaded", function () {
        switchTab();
    });

    function setAmountBorder(el, checked) {
        if (checked) {
            el.style.setProperty('border', '4px solid #F7D728', 'important');
            el.style.setProperty('padding', '5px 7px', 'important');
        } else {
            el.style.setProperty('border', '1px solid #C6C6C6', 'important');
            el.style.setProperty('padding', '8px 10px', 'important');
        }
    }

    function getAmountInput() {
        return document.getElementById('donations_sum_number');
    }

    function setAmountBorders(ignoreChecked) {
        var labels = document.querySelectorAll('#donationAmounts > .mkdf-form-item-button > label, #donationAmounts > .mkdf-form-item-labeled > label');
        var borderElement;
        for (var i = 0; i < labels.length; i++) {
            var label = borderElement = labels[i];
            var input = document.getElementById(label.htmlFor);
            if (input.id === 'donations_sum_write') {
                borderElement = getAmountInput();
            }
            setAmountBorder(borderElement, input.checked || ignoreChecked);
        }
    }

    function changeDonationAmount() {
        document.getElementById("mkdf.donate.sum.notice").style.setProperty('color', '', 'important');
        setAmountBorders(false);
    }

    function flashAmountBorders(times, on) {
        setAmountBorders(on);
        if (times <= 0 && !on) {
            return;
        }
        setTimeout(function () {
            flashAmountBorders(times - 1, !on);
        }, 300);
    }

    function isValidAmount() {
        var donationsSums = document.getElementsByName('donations_sum');
        var checked = document.querySelector('input[name=\'donations_sum\']:checked');
        var amount = checked && checked.value === 'custom' ? parseFloat(getAmountInput().value) : NaN;
        if (!donationsSums[0].checkValidity() ||
            (checked && checked.value === 'custom' && (isNaN(amount) || amount <= 0))) {
            document.getElementById("mkdf.donate.sum.notice").style.setProperty('color', 'red', 'important');
            if (checked && checked.value === 'custom') {
                checked.checked = false;
            }
            flashAmountBorders(4, true);
            return false;
        }
        return true;
    }

    function setCustomerDataBorders(on) {
        setAmountBorder(document.getElementById('customer_data'), on);
    }

    function flashCustomerDataBorders(times, on) {
        setCustomerDataBorders(on);
        if (times <= 0 && !on) {
            return;
        }
        setTimeout(function () {
            flashCustomerDataBorders(times - 1, !on);
        }, 300);
    }

    function isValidCustomerData(fullName, idCode, email) {
        if (fullName.checkValidity() && idCode.checkValidity() && email.checkValidity()) {
            return true;
        }
        flashCustomerDataBorders(4, true);
        return false;
    }

    function changeBankLink(el) {
        var fullName = document.getElementById('mkdf.donator.full.name');
        var idCode = document.getElementById("mkdf.donator.personCode");
        var email = document.getElementById("mkdf.donator.email");
        if (!isValidAmount() | !isValidCustomerData(fullName, idCode, email)) {
            el.checked = false;
            return;
        }

        changeBankLinkStyle(el);

        var checkedAmount = document.querySelector('input[name=\'donations_sum\']:checked');
        var amount = checkedAmount.value === 'custom' ? getAmountInput().value : checkedAmount.value;

        var gatewayUrl = document.getElementById("mkdf.gateway.url");
        var donationProjectId = document.getElementById("mkdf.project.id");
        var locale = document.getElementById("mkdf.locale");
        var country = document.getElementById("mkdf.country");

        if ((gatewayUrl.checkValidity() && donationProjectId.checkValidity())) {
            var url = getGatewayUrl(gatewayUrl.value, donationProjectId.value, el.value, "false", amount, fullName.value, idCode.value, email.value, locale.value, country.value);
            console.log(url.toString());
            window.open(url, '_blank');
        } else {
            console.log('Parameters not valid!');
        }
    }

    function changeBankLinkStyle(el) {
        var donationsBanks = document.getElementsByName(el.name);
        for (var i = 0; i < donationsBanks.length; i++) {
            var element = donationsBanks[i];
            var elementToResetStyles = element.nextElementSibling;
            elementToResetStyles.style.setProperty('border', '4px solid #FFF', 'important');
        }

        var elementToApplyStyles = el.nextElementSibling;
        elementToApplyStyles.style.setProperty('background', '#FFC600', 'important');
        elementToApplyStyles.style.setProperty('border', '4px solid #F7D728', 'important');
    }

    function getGatewayUrl(gatewayUrl, donationProjectId, channel, standingOrder, amount, fullName, idCode, email, locale, country) {
        var url = new URL(gatewayUrl + '/donate.html');
        url.searchParams.append('do', donationProjectId);
        url.searchParams.append('ch', channel);
        url.searchParams.append('st', standingOrder);

        url.searchParams.append('am', amount == null ? '' : amount);
        url.searchParams.append('na', fullName == null ? '' : fullName);
        url.searchParams.append('pe', idCode == null ? '' : idCode);
        url.searchParams.append('em', email == null ? '' : email);
        url.searchParams.append('lo', locale == null ? '' : locale);
        url.searchParams.append('co', country == null ? '' : country);

        return url.toString();
    }


    function changeBankLinkSo(el) {
        changeBankLinkStyle(el);

        var gatewayUrl = document.getElementById("mkdf.gateway.url");
        var donationProjectId = document.getElementById("mkdf.project.id");
        var locale = document.getElementById("mkdf.locale");
        var country = document.getElementById("mkdf.country");

        if (gatewayUrl.checkValidity() && donationProjectId.checkValidity()) {
            var url = getGatewayUrl(gatewayUrl.value, donationProjectId.value, el.value, "true", null, null, null, null, locale.value, country.value);
            console.log(url.toString());
            window.open(url, '_blank');
        } else {
            console.log('Parameters not valid!');
        }
    }

    function validate(input) {
        var feedback = input.nextElementSibling;
        feedback.style.setProperty('display', (input.checkValidity() ? 'none' : 'inline-block'), 'important');
    }

    function donationSumNeedBeChecked() {
        var checked = null;
        var donationsSums = document.getElementsByName("donations_sum");
        for (var i = 0; i < donationsSums.length; i++) {
            var element = donationsSums[i];
            if (element.checked) {
                checked = element;
                break;
            }
        }
        return !!checked && checked.value === 'custom';
    }
</script>
