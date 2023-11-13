app.directive('inputChange', function () {
    return {
        restrict: 'A',
        scope: {
            saveObject: '='
        },
        link: function (scope, element, attrs) {
            element.bind('propertychange keyup paste', () => {
                if (!isObject(scope.saveObject)) scope.saveObject = {}

                scope.saveObject[attrs.inputChange] = element[0].value
            })
        }
    }
})

function isObject(val) {
    if (val === null) { return false; }
    return ((typeof val === 'function') || (typeof val === 'object'));
}

app.directive('fileDownload', function () {
    return {
        restrict: 'A',
        scope: {
            fileName: '=',
            fileData: '='
        },
        link: function (scope, element, attrs) {
            element.bind('click', () => {
                let name = scope.fileName
                let data = scope.fileData

                let a = document.createElement('a')
                a.href = data
                a.download = name
                a.target = '_blank'
                a.click()
            })
        }
    }
})

app.directive('fileView', function () {
    return {
        restrict: 'A',
        scope: {
            fileName: '=',
            fileData: '='
        },
        link: function (scope, element, attrs) {
            element.bind('click', () => {
                let name = scope.fileName
                let data = scope.fileData

                let pdfWindow = window.open(name);
                pdfWindow.document.write("<html><head> <title>" + name + "</title> </head><body style='margin: 0px; padding: 0px; box-sizing: border-box; overflow-x: hidden;' ><iframe width='100%' height='100%' src='" + data + "'></iframe></body></html>");
            })
        }
    }
})

app.directive('fileChange', function () {
    return {
        restrict: 'A',
        scope: {
            variable: '@',
            files: '=',
            multipleFiles: '='
        },
        link: function (scope, element, attrs) {
            var checkSize, isTypeValid, validMimeTypes, setupReader;
            let variable = scope.variable || 'files'

            validMimeTypes = attrs.fileChange;

            checkSize = function (size) {
                var _ref;

                if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
                    return true;
                } else {
                    return false;
                }
            };

            isTypeValid = function (type) {
                if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
                    return true;
                } else {
                    alert("Invalid file type.  File must be one of following types " + validMimeTypes);
                    return false;
                }
            };

            setupReader = function (file) {
                var name, reader, size, type;

                reader = new FileReader();
                reader.onload = function (evt) {
                    if (checkSize(size) && isTypeValid(type)) {
                        return scope.$apply(function () {
                            if (!Array.isArray(scope.files[variable]) || !scope.multiple || scope.multiple == 'false') scope.files[variable] = []
                            
                            return scope.files[variable].push({
                                file: evt.target.result,
                                name: name
                            });
                        });
                    }
                };

                name = file.name;
                type = file.type;
                size = file.size;
                reader.readAsDataURL(file);
            }

            return element.bind('change', (event) => {
                let length = 1;

                if (event != null) {
                    event.preventDefault();
                }

                if (scope.multipleFiles == 'true' || scope.multipleFiles == true) length = event.target.files.length

                for (let i = 0; i < length; i++) {
                    var file = event.target.files[i]
                    setupReader(file)
                }

                return false;
            });
        }
    };
});

app.directive('fileDropzone', function () {
    return {
        restrict: 'A',
        scope: {
            variable: '@',
            files: '=',
            multiple: '='
        },
        link: function (scope, element, attrs) {
            var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes, setupReader;
            let variable = scope.variable || 'files'

            processDragOverOrEnter = function (event) {
                if (event != null) {
                    event.preventDefault();
                }
                event.dataTransfer.effectAllowed = 'copy';
                return false;
            };
            validMimeTypes = attrs.fileDropzone;

            checkSize = function (size) {
                var _ref;

                if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
                    return true;
                } else {
                    return false;
                }
            };

            isTypeValid = function (type) {
                if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
                    return true;
                } else {
                    alert("Invalid file type.  File must be one of following types " + validMimeTypes);
                    return false;
                }
            };

            element.bind('dragover', processDragOverOrEnter);
            element.bind('dragenter', processDragOverOrEnter);

            setupReader = function (file) {
                var name, reader, size, type;

                reader = new FileReader();
                reader.onload = function (evt) {
                    if (checkSize(size) && isTypeValid(type)) {
                        return scope.$apply(function () {
                            if (!Array.isArray(scope.files[variable]) || !scope.multiple || scope.multiple == 'false') scope.files[variable] = []

                            return scope.files[variable].push({
                                file: evt.target.result,
                                name: name
                            });
                        });
                    }
                };

                name = file.name;
                type = file.type;
                size = file.size;
                reader.readAsDataURL(file);
            }

            return element.bind('drop', function (event) {
                let length = 1;

                if (event != null) {
                    event.preventDefault();
                }
                if (scope.multiple == 'true' || scope.multiple == true) length = event.dataTransfer.files.length

                for (let i = 0; i < length; i++) {
                    var file = event.dataTransfer.files[i]
                    setupReader(file)
                }

                return false;
            });
        }
    };
});

app.directive('signature', ['$rootScope', '$mdDialog', function ($rootScope, $mdDialog) {
    return {
        restrict: 'EA',
        scope: {
            func: '=',
            name: '@'
        },
        link: function (scope, element, attrs) {
            scope.pad = ''
            scope.imageSignature = []
            scope.signatureTabIndex = 0

            scope.clearPad = () => {
                if (scope.pad) scope.pad.clear()
            }

            scope.saveSignature = () => {
                if (scope.signatureTabIndex == 0) {
                    if (scope.pad) {
                        scope.func([{
                            file: scope.pad.toDataURL("image/jpeg"),
                            name: scope.name || 'signature.jpg',
                            signature: true
                        }], scope.name)
                    }
                } else {
                    scope.func(scope.imageSignature, scope.name)
                }
            }

            scope.clearImage = () => {
                imageSignature = []
            }

            element.bind('click', function (ev) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'popup/signature.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: false,
                    scope: scope,
                    preserveScope: true
                })
                    .then(function (type) {
                        //
                    }, function () {
                        //
                    });
            });
        }
    }
}])

app.directive('signatureDraw', function () {
    return {
        restrict: 'A',
        link: function (scope, elem) {
            var dom, pad;
            dom = elem[0];
            canvas = dom;

            if (dom.tagName !== 'CANVAS') {
                throw new Error(`Expecting CANVAS but got ${dom.tagName}`);
            } else {
                pad = new SignaturePad(dom, {
                    backgroundColor: 'rgb(255, 255, 255)',
                    penColor: 'rgb(0, 0, 0)'
                });

                scope.pad = pad
            }
        }
    };
});

app.directive('dateInput', function(){
    return {
        restrict : 'A',
        scope : {
            ngModel : '='
        },
        link: function (scope) {
            if (scope.ngModel) scope.ngModel = new Date(scope.ngModel);
        }
    }
});

app.directive('fileUpload', ['$rootScope', '$mdDialog', function ($rootScope, $mdDialog) {
    return {
        restrict: 'EA',
        scope: {
            func: '=',
            index: '@'
        },
        link: function (scope, element, attrs) {
            scope.files = {
                files: []
            }

            element.bind('click', function (ev) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'popup/fileUpload.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: false,
                    scope: scope,
                    preserveScope: true
                })
                    .then(function (type) {
                        scope.func(scope.files.files, scope.index)
                    }, function () {
                        scope.files = {
                            files: []
                        }
                    });
            });
        }
    }
}])



function DialogController($scope, $mdDialog) {

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.save = function (save) {
        $mdDialog.hide(save);
    };

    $scope.edit = function (save) {
        $mdDialog.hide(save);
    };
}