import React from 'react';
import { User, Phone, MapPin, Globe } from 'lucide-react';
import Input from '../../../components/Input';
import Select from '../../../components/Select';

const PersonalInfoStep = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <User className="text-blue-500" /> Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          type="text"
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={onChange}
          placeholder="John"
          required
        />
        <Input
          type="text"
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={onChange}
          placeholder="Doe"
          required
        />
        <Select
          name="gender"
          label="Gender"
          value={formData.gender}
          onChange={onChange}
          placeholder="Select Gender"
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' }
          ]}
          required
        />
        <Input
          type="tel"
          name="phone"
          label="Phone Number"
          leftIcon={Phone}
          value={formData.phone}
          onChange={onChange}
          placeholder="+62 812..."
          required
        />
        <Input
          type="text"
          name="address"
          label="Address"
          leftIcon={MapPin}
          value={formData.address}
          onChange={onChange}
          placeholder="Street name, Building No..."
          containerClassName="md:col-span-2"
          required
        />
        <Input
          type="text"
          name="city"
          label="City"
          value={formData.city}
          onChange={onChange}
          placeholder="Jakarta"
          required
        />
        <Input
          type="text"
          name="province"
          label="Province"
          value={formData.province}
          onChange={onChange}
          placeholder="DKI Jakarta"
          required
        />
        <Input
          type="text"
          name="postalCode"
          label="Postal Code"
          value={formData.postalCode}
          onChange={onChange}
          placeholder="12345"
          required
        />
        <Input
          type="text"
          name="country"
          label="Country"
          leftIcon={Globe}
          value={formData.country}
          onChange={onChange}
          placeholder="Indonesia"
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfoStep;
