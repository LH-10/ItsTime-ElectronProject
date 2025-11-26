# **Build Guide**

This is a Build Guide  to generate installers for this Electron application on **Windows**, **Linux**, and **macOS**.

---

## **Windows**

### **Dependencies**

* Node.js + npm / yarn
* Windows OS (physical or virtual)

### **Build Steps**

```bash
npm install
```

```bash
npm run make
```

### **Installer Output**

```
/out/make/
```

> Build is generated natively on Windows to avoid compatibility issues with platform-specific binaries.

---

## **Linux**

### **Dependencies**

* Docker or Podman
* `Containerfile` located in The-app directory

### **Build Using Podman/Docker**

```bash
podman build -t electron-app .
```

```bash
podman run -v $(pwd)/linuxbuild/:/app/linuxbuild/ electron-app
```

### **Installer Output**

```
/linuxbuild/out/  
 → /make/deb/x64/.deb
```

> RPM support is planned currently the container builds targets for Debian based environments only.

---

## **macOS**

A macOS build has not yet been produced because I don't  have macOS access.
I will update this once macOS testing and build runs are available.

---
