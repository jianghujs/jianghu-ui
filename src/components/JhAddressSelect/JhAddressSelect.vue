<template>
  <div class="jh-address-select">
    <template v-if="type === 'select'">
      <v-row dense>
        <v-col cols="12" :md="gridCol">
          <v-autocomplete
            class="jh-v-input"
            v-model="internalValue.province"
            :items="provinces"
            :label="labels.province"
            :outlined="outlined"
            :dense="dense"
            :filled="filled"
            :single-line="singleLine"
            :loading="loading"
            item-text="name"
            item-value="code"
            clearable
            hide-details
            hide-no-data
            prepend-inner-icon="mdi-map-outline"
            @change="handleProvinceChange"
          ></v-autocomplete>
        </v-col>
        
        <v-col v-if="level >= 2" cols="12" :md="gridCol">
          <v-autocomplete
            class="jh-v-input"
            v-model="internalValue.city"
            :items="cities"
            :label="labels.city"
            :disabled="!internalValue.province"
            :outlined="outlined"
            :dense="dense"
            :filled="filled"
            :single-line="singleLine"
            :loading="loading"
            item-text="name"
            item-value="code"
            clearable
            prepend-inner-icon="mdi-city-variant-outline"
            @change="handleCityChange"
          ></v-autocomplete>
        </v-col>

        <v-col v-if="level >= 3" cols="12" :md="gridCol">
          <v-autocomplete
            class="jh-v-input"
            v-model="internalValue.district"
            :items="districts"
            :label="labels.district"
            :disabled="!internalValue.city"
            :outlined="outlined"
            :dense="dense"
            :filled="filled"
            :single-line="singleLine"
            :loading="loading"
            item-text="name"
            item-value="code"
            clearable
            prepend-inner-icon="mdi-home-city-outline"
            @change="handleDistrictChange"
          ></v-autocomplete>
        </v-col>

        <v-col v-if="level >= 4" cols="12" :md="gridCol">
          <v-autocomplete
            class="jh-v-input"
            v-model="internalValue.town"
            :items="towns"
            :label="labels.town"
            :disabled="!internalValue.district"
            :outlined="outlined"
            :dense="dense"
            :filled="filled"
            :single-line="singleLine"
            :loading="loading"
            item-text="name"
            item-value="code"
            clearable
            prepend-inner-icon="mdi-home-variant-outline"
            @change="emitChange"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </template>

    <template v-else-if="type === 'cascader'">
      <v-menu
        v-model="menuVisible"
        :close-on-content-click="false"
        offset-y
        max-width="100%"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            class="jh-v-input"
            v-bind="attrs"
            v-on="on"
            :value="displayText"
            :label="label"
            :outlined="outlined"
            :dense="dense"
            :filled="filled"
            :single-line="singleLine"
            :loading="loading"
            readonly
            append-icon="mdi-menu-down"
            clearable
            hide-details
            @click:clear="clearValue"
          ></v-text-field>
        </template>
        <v-card class="jh-cascader-card">
          <div class="jh-cascader-container">
             <div class="jh-cascader-column" v-if="provinces.length">
                <v-list dense class="pa-0">
                   <v-list-item v-for="item in provinces" :key="item.code" @click="onProvinceClick(item)" :class="{'v-item--active v-list-item--active primary--text': internalValue.province === item.code}">
                      <v-list-item-content><v-list-item-title :title="item.name">{{ item.name }}</v-list-item-title></v-list-item-content>
                      <v-list-item-action v-if="level > 1"><v-icon small>mdi-chevron-right</v-icon></v-list-item-action>
                   </v-list-item>
                </v-list>
             </div>

             <div v-if="level >= 2 && internalValue.province && cities.length" class="jh-cascader-column">
                 <v-list dense class="pa-0">
                   <v-list-item v-for="item in cities" :key="item.code" @click="onCityClick(item)" :class="{'v-item--active v-list-item--active primary--text': internalValue.city === item.code}">
                      <v-list-item-content><v-list-item-title :title="item.name">{{ item.name }}</v-list-item-title></v-list-item-content>
                      <v-list-item-action v-if="level > 2"><v-icon small>mdi-chevron-right</v-icon></v-list-item-action>
                   </v-list-item>
                </v-list>
             </div>

             <div v-if="level >= 3 && internalValue.city && districts.length" class="jh-cascader-column">
                 <v-list dense class="pa-0">
                   <v-list-item v-for="item in districts" :key="item.code" @click="onDistrictClick(item)" :class="{'v-item--active v-list-item--active primary--text': internalValue.district === item.code}">
                      <v-list-item-content><v-list-item-title :title="item.name">{{ item.name }}</v-list-item-title></v-list-item-content>
                      <v-list-item-action v-if="level > 3"><v-icon small>mdi-chevron-right</v-icon></v-list-item-action>
                   </v-list-item>
                </v-list>
             </div>

             <div v-if="level >= 4 && internalValue.district && towns.length" class="jh-cascader-column">
                 <v-list dense class="pa-0">
                   <v-list-item v-for="item in towns" :key="item.code" @click="onTownClick(item)" :class="{'v-item--active v-list-item--active primary--text': internalValue.town === item.code}">
                      <v-list-item-content><v-list-item-title :title="item.name">{{ item.name }}</v-list-item-title></v-list-item-content>
                   </v-list-item>
                </v-list>
             </div>
          </div>
        </v-card>
      </v-menu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'JhAddressSelect',
  props: {
    value: {
      type: Object,
      default: () => ({ province: null, city: null, district: null, town: null })
    },
    level: { type: Number, default: 3 },
    outlined: { type: Boolean, default: true },
    dense: { type: Boolean, default: true },
    filled: { type: Boolean, default: true },
    singleLine: { type: Boolean, default: true },
    type: { type: String, default: 'select' }, // select | cascader
    label: { type: String, default: '请选择地区' },

    loading: { type: Boolean, default: false },
    labels: {
      type: Object,
      default: () => ({ province: '省份', city: '城市', district: '区/县', town: '乡镇' })
    },
    data: {
      type: Array,
      default: () => [
        { code: '110000', name: '北京市', children: [{ code: '110100', name: '市辖区', children: [{ code: '110101', name: '东城区', children: [{ code: '110101001', name: '东华门街道' }] }] }] },
        { 
          code: '440000', name: '广东省', 
          children: [
            { code: '440100', name: '广州市', children: [{ code: '440106', name: '天河区', children: [{ code: '440106001', name: '天河南街道' }] }] },
            { code: '440300', name: '深圳市', children: [{ code: '440305', name: '南山区', children: [{ code: '440305001', name: '南头街道' }] }] }
          ] 
        }
      ]
    }
  },
  data() {
    return {
      internalValue: { ...this.value },
      cities: [],
      districts: [],
      towns: [],
      menuVisible: false,
    };
  },
  computed: {
    provinces() {
      return this.data.map(i => ({ code: i.code, name: i.name }));
    },
    gridCol() {
      if (this.level === 1) return 12;
      if (this.level === 2) return 6;
      if (this.level === 3) return 4;
      return 3;
    },
    displayText() {
      if (!this.internalValue.province) return '';
      const p = this.provinces.find(x => x.code === this.internalValue.province);
      let text = p ? p.name : '';
      
      if (this.level >= 2 && this.internalValue.city) {
        const c = this.cities.find(x => x.code === this.internalValue.city);
        if (c) text += ` / ${c.name}`;
      }

      if (this.level >= 3 && this.internalValue.district) {
        const d = this.districts.find(x => x.code === this.internalValue.district);
        if (d) text += ` / ${d.name}`;
      }

      if (this.level >= 4 && this.internalValue.town) {
        const t = this.towns.find(x => x.code === this.internalValue.town);
        if (t) text += ` / ${t.name}`;
      }
      
      return text;
    },
    fullValue() {
      const result = {
        province: null,
        city: null,
        district: null,
        town: null
      };
      
      if (this.internalValue.province) {
        const province = this.provinces.find(p => p.code === this.internalValue.province);
        if (province) {
          result.province = { code: province.code, name: province.name };
        }
      }
      
      if (this.internalValue.city) {
        const city = this.cities.find(c => c.code === this.internalValue.city);
        if (city) {
          result.city = { code: city.code, name: city.name };
        }
      }
      
      if (this.internalValue.district) {
        const district = this.districts.find(d => d.code === this.internalValue.district);
        if (district) {
          result.district = { code: district.code, name: district.name };
        }
      }
      
      if (this.internalValue.town) {
        const town = this.towns.find(t => t.code === this.internalValue.town);
        if (town) {
          result.town = { code: town.code, name: town.name };
        }
      }
      
      return result;
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        const newValue = { province: null, city: null, district: null, town: null };
        
        if (val.province) {
          newValue.province = typeof val.province === 'object' ? val.province.code : val.province;
        }
        if (val.city) {
          newValue.city = typeof val.city === 'object' ? val.city.code : val.city;
        }
        if (val.district) {
          newValue.district = typeof val.district === 'object' ? val.district.code : val.district;
        }
        if (val.town) {
          newValue.town = typeof val.town === 'object' ? val.town.code : val.town;
        }
        
        this.internalValue = newValue;
        
        if (newValue.province) {
          const provinceMatch = this.data.find(i => i.code === newValue.province);
          this.cities = provinceMatch ? provinceMatch.children : [];
          
          if (newValue.city) {
            const cityMatch = this.cities.find(i => i.code === newValue.city);
            this.districts = cityMatch ? cityMatch.children : [];
            
            if (newValue.district) {
              const districtMatch = this.districts.find(i => i.code === newValue.district);
              this.towns = districtMatch ? districtMatch.children : [];
            }
          }
        }
      }
    }
  },
  methods: {
    handleProvinceChange(code) {
      this.internalValue.city = null;
      this.internalValue.district = null;
      this.internalValue.town = null;
      this.cities = [];
      this.districts = [];
      this.towns = [];
      if (code) {
        const match = this.data.find(i => i.code === code);
        this.cities = match ? match.children : [];
      }
      this.emitChange();
    },
    handleCityChange(code) {
      this.internalValue.district = null;
      this.internalValue.town = null;
      this.districts = [];
      this.towns = [];
      if (code) {
        const provinceMatch = this.data.find(i => i.code === this.internalValue.province);
        const cityMatch = provinceMatch?.children.find(i => i.code === code);
        this.districts = cityMatch ? cityMatch.children : [];
      }
      this.emitChange();
    },
    handleDistrictChange(code) {
      this.internalValue.town = null;
      this.towns = [];
      if (code) {
        const provinceMatch = this.data.find(i => i.code === this.internalValue.province);
        const cityMatch = provinceMatch?.children.find(i => i.code === this.internalValue.city);
        const districtMatch = cityMatch?.children.find(i => i.code === code);
        this.towns = districtMatch ? districtMatch.children : [];
      }
      this.emitChange();
    },
    emitChange() {
      this.$emit('input', { ...this.fullValue });
      this.$emit('change', { ...this.fullValue });
    },
    onProvinceClick(item) {
      this.internalValue.province = item.code;
      this.handleProvinceChange(item.code);
      if (this.level === 1) this.menuVisible = false;
    },
    onCityClick(item) {
      this.internalValue.city = item.code;
      this.handleCityChange(item.code);
      if (this.level === 2) this.menuVisible = false;
    },
    onDistrictClick(item) {
      this.internalValue.district = item.code;
      this.handleDistrictChange(item.code);
      if (this.level === 3) this.menuVisible = false;
    },
    onTownClick(item) {
      this.internalValue.town = item.code;
      this.emitChange();
      if (this.level === 4) this.menuVisible = false;
    },
    clearValue() {
      this.internalValue = { province: null, city: null, district: null, town: null };
      this.cities = [];
      this.districts = [];
      this.towns = [];
      this.emitChange();
    }
  }
};
</script>

<style scoped>
.jh-cascader-container {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
}
.jh-cascader-column {
  min-width: 180px;
  max-width: 250px;
  max-height: 400px;
  overflow-y: auto;
  border-right: 1px solid #eee;
}
.jh-cascader-column:last-child {
  border-right: none;
}
/* 优化列表项内容防止过早截断 */
.jh-cascader-column .v-list-item__content {
  overflow: visible;
}
.jh-cascader-column .v-list-item__title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
